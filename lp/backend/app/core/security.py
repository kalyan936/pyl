"""Security utilities — JWT tokens, password hashing, AES-256 encryption."""

from datetime import datetime, timedelta, timezone
from typing import Optional
import base64
import os

from jose import JWTError, jwt
from passlib.context import CryptContext
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

# ── Password hashing ──────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ── JWT ────────────────────────────────────────────────────────────
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.JWT_EXPIRATION_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    """Dependency: extracts user ID from JWT."""
    payload = decode_access_token(token)
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    return int(user_id)


# ── AES-256-GCM Encryption ────────────────────────────────────────
def _get_aes_key() -> bytes:
    key_b64 = settings.AES_ENCRYPTION_KEY
    if not key_b64:
        # Generate a dev key (NOT for production)
        return os.urandom(32)
    return base64.b64decode(key_b64)


def encrypt_data(plaintext: str) -> str:
    """Encrypt string with AES-256-GCM → returns base64(nonce + ciphertext)."""
    key = _get_aes_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), None)
    return base64.b64encode(nonce + ciphertext).decode("utf-8")


def decrypt_data(encrypted: str) -> str:
    """Decrypt AES-256-GCM base64 blob → plaintext string."""
    key = _get_aes_key()
    raw = base64.b64decode(encrypted)
    nonce, ciphertext = raw[:12], raw[12:]
    aesgcm = AESGCM(key)
    return aesgcm.decrypt(nonce, ciphertext, None).decode("utf-8")
