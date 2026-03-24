"""Seed the database with curriculum content."""

from sqlalchemy import select
from app.core.database import async_session
from app.models.models import Course, Module


CURRICULUM = [
    {
        "title": "Python Fundamentals",
        "slug": "python-fundamentals",
        "description": "Master Python from scratch — variables, loops, functions, OOP, and more.",
        "category": "python_basics",
        "icon": "🐍",
        "order_index": 1,
        "modules": [
            {
                "title": "Hello World & Variables",
                "slug": "hello-world-variables",
                "difficulty": "beginner",
                "estimated_minutes": 15,
                "order_index": 1,
                "content_md": """# Hello World & Variables

## Welcome to Python! 🎉

Python is one of the most popular programming languages in the world. Let's start with the basics.

### Print Statement
```python
print("Hello, World!")
```

### Variables
Variables store data. Python is *dynamically typed* — you don't need to declare types.

```python
name = "Alice"       # string
age = 25             # integer
height = 5.6         # float
is_student = True    # boolean
```

### String Formatting
```python
print(f"My name is {name} and I'm {age} years old.")
```

## 🏋️ Exercise
Create variables for your name, age, and favorite language. Print a sentence using f-strings.
""",
                "code_template": '# Create your variables here\nname = ""\nage = 0\nfavorite_lang = ""\n\n# Print a formatted sentence\nprint(f"Hi, I\'m {name}!")\n',
                "expected_output": "Hi, I'm",
            },
            {
                "title": "Control Flow — if/else & Loops",
                "slug": "control-flow",
                "difficulty": "beginner",
                "estimated_minutes": 20,
                "order_index": 2,
                "content_md": """# Control Flow

## Conditional Statements

```python
temperature = 30

if temperature > 35:
    print("It's very hot!")
elif temperature > 25:
    print("It's warm.")
else:
    print("It's cool.")
```

## For Loops
```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")
```

## While Loops
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## 🏋️ Exercise
Write a program that prints numbers 1 to 20. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For both, print "FizzBuzz".
""",
                "code_template": "# FizzBuzz Challenge\nfor i in range(1, 21):\n    # Your code here\n    pass\n",
                "expected_output": "FizzBuzz",
            },
            {
                "title": "Functions & Modules",
                "slug": "functions-modules",
                "difficulty": "beginner",
                "estimated_minutes": 25,
                "order_index": 3,
                "content_md": """# Functions & Modules

## Defining Functions
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))
print(greet("Bob", "Hi"))
```

## Lambda Functions
```python
square = lambda x: x ** 2
print(square(5))  # 25
```

## Built-in Modules
```python
import math
print(math.sqrt(144))  # 12.0

import random
print(random.randint(1, 100))
```

## 🏋️ Exercise
Write a function `is_palindrome(text)` that returns `True` if the text reads the same forwards and backwards.
""",
                "code_template": 'def is_palindrome(text):\n    """Return True if text is a palindrome."""\n    # Your code here\n    pass\n\n# Test it\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False\n',
                "expected_output": "True",
            },
            {
                "title": "Object-Oriented Programming",
                "slug": "oop-basics",
                "difficulty": "intermediate",
                "estimated_minutes": 30,
                "order_index": 4,
                "content_md": """# Object-Oriented Programming

## Classes and Objects
```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed
    
    def bark(self):
        return f"{self.name} says Woof!"

my_dog = Dog("Rex", "Labrador")
print(my_dog.bark())
```

## Inheritance
```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
```

## 🏋️ Exercise
Create a `BankAccount` class with `deposit()`, `withdraw()`, and `get_balance()` methods.
""",
                "code_template": "class BankAccount:\n    def __init__(self, owner, balance=0):\n        pass\n    \n    def deposit(self, amount):\n        pass\n    \n    def withdraw(self, amount):\n        pass\n    \n    def get_balance(self):\n        pass\n\n# Test\naccount = BankAccount(\"Alice\", 100)\naccount.deposit(50)\naccount.withdraw(30)\nprint(account.get_balance())  # 120\n",
                "expected_output": "120",
            },
        ],
    },
    {
        "title": "Data Science with Python",
        "slug": "data-science-python",
        "description": "Learn NumPy, Pandas, Matplotlib, and real-world data analysis techniques.",
        "category": "data_science",
        "icon": "📊",
        "order_index": 2,
        "modules": [
            {
                "title": "NumPy Foundations",
                "slug": "numpy-foundations",
                "difficulty": "intermediate",
                "estimated_minutes": 25,
                "order_index": 1,
                "content_md": """# NumPy Foundations

## What is NumPy?
NumPy is the fundamental package for numerical computing in Python.

```python
import numpy as np

# Create arrays
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
rand = np.random.rand(3, 3)

# Operations
print(arr * 2)          # [2, 4, 6, 8, 10]
print(arr.mean())       # 3.0
print(arr.reshape(5,1)) # Column vector
```

## Array Operations
```python
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print(a + b)        # Element-wise addition
print(a @ b)        # Matrix multiplication
print(np.dot(a, b)) # Same as above
```

## 🏋️ Exercise
Create a 5x5 identity matrix and multiply it by a random 5x5 matrix. Verify the result equals the random matrix.
""",
                "code_template": "import numpy as np\n\n# Create identity matrix\nidentity = np.eye(5)\n\n# Create random matrix\nrandom_matrix = np.random.rand(5, 5)\n\n# Multiply and verify\nresult = identity @ random_matrix\nprint(np.allclose(result, random_matrix))  # Should print True\n",
                "expected_output": "True",
            },
            {
                "title": "Pandas for Data Analysis",
                "slug": "pandas-data-analysis",
                "difficulty": "intermediate",
                "estimated_minutes": 30,
                "order_index": 2,
                "content_md": """# Pandas for Data Analysis

## DataFrames
```python
import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['NYC', 'LA', 'Chicago']
}
df = pd.DataFrame(data)
print(df.head())
```

## Reading Data
```python
# df = pd.read_csv('data.csv')
# df = pd.read_excel('data.xlsx')
```

## Data Exploration
```python
print(df.describe())  # Summary statistics
print(df.info())      # Column types & nulls
print(df.shape)       # (rows, columns)
```

## Filtering & Selection
```python
adults = df[df['Age'] > 25]
names = df['Name'].tolist()
```

## 🏋️ Exercise
Create a DataFrame of 5 students with Name, Math_Score, Science_Score columns. Calculate the average score per student.
""",
                "code_template": "import pandas as pd\n\n# Create student data\nstudents = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],\n    'Math': [85, 92, 78, 95, 88],\n    'Science': [90, 85, 82, 91, 87]\n})\n\n# Calculate average\nstudents['Average'] = (students['Math'] + students['Science']) / 2\nprint(students)\n",
                "expected_output": "Average",
            },
            {
                "title": "Data Visualization with Matplotlib",
                "slug": "matplotlib-visualization",
                "difficulty": "intermediate",
                "estimated_minutes": 25,
                "order_index": 3,
                "content_md": """# Data Visualization

## Matplotlib Basics
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.legend()
plt.grid(True)
plt.show()
```

## Chart Types
- `plt.bar()` — Bar charts
- `plt.scatter()` — Scatter plots
- `plt.hist()` — Histograms
- `plt.pie()` — Pie charts
- `plt.boxplot()` — Box plots

## 🏋️ Exercise
Create a bar chart comparing the average monthly temperatures of two cities.
""",
                "code_template": "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']\ncity_a = [5, 7, 12, 18, 23, 28]\ncity_b = [15, 17, 20, 24, 28, 32]\n\n# Create your bar chart here\nprint('Chart created!')\n",
                "expected_output": "Chart created!",
            },
        ],
    },
    {
        "title": "AI & Machine Learning",
        "slug": "ai-machine-learning",
        "description": "Build ML models with scikit-learn, understand neural networks with PyTorch, and explore LLMs.",
        "category": "ai_ml",
        "icon": "🤖",
        "order_index": 3,
        "modules": [
            {
                "title": "Introduction to Machine Learning",
                "slug": "intro-ml",
                "difficulty": "intermediate",
                "estimated_minutes": 20,
                "order_index": 1,
                "content_md": """# Introduction to Machine Learning

## What is ML?
Machine Learning is a subset of AI where systems learn from data to make predictions or decisions.

## Types of ML
1. **Supervised Learning** — labeled data (classification, regression)
2. **Unsupervised Learning** — no labels (clustering, dimensionality reduction)
3. **Reinforcement Learning** — agent learns from environment rewards

## ML Workflow
```
Data → Preprocess → Train → Evaluate → Deploy
```

## scikit-learn Example
```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load data
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

# Train
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")
```

## 🏋️ Exercise
Train a model on the iris dataset and print the accuracy.
""",
                "code_template": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Your ML pipeline here\niris = load_iris()\n\n# Split, train, evaluate\nprint('ML model trained!')\n",
                "expected_output": "ML model trained!",
            },
            {
                "title": "Neural Networks with PyTorch",
                "slug": "neural-networks-pytorch",
                "difficulty": "advanced",
                "estimated_minutes": 35,
                "order_index": 2,
                "content_md": """# Neural Networks with PyTorch

## What is a Neural Network?
A network of interconnected nodes (neurons) organized in layers that learn patterns from data.

## PyTorch Basics
```python
import torch
import torch.nn as nn

# Tensors
x = torch.tensor([1.0, 2.0, 3.0])
w = torch.randn(3, requires_grad=True)

# Simple operation with autograd
y = (x * w).sum()
y.backward()
print(w.grad)
```

## Building a Neural Network
```python
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 10)
        )
    
    def forward(self, x):
        return self.layers(x)
```

## 🏋️ Exercise
Create a simple 2-layer neural network and perform a forward pass with random input.
""",
                "code_template": "import torch\nimport torch.nn as nn\n\n# Define your network\nclass MyNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        # Add layers here\n        pass\n    \n    def forward(self, x):\n        pass\n\n# Create and test\nprint('Neural network created!')\n",
                "expected_output": "Neural network created!",
            },
            {
                "title": "Large Language Models & Transformers",
                "slug": "llms-transformers",
                "difficulty": "advanced",
                "estimated_minutes": 30,
                "order_index": 3,
                "content_md": """# Large Language Models & Transformers

## The Transformer Architecture
Transformers use **self-attention** to process all tokens simultaneously, unlike RNNs.

Key components:
- **Self-Attention** — each token attends to all others
- **Multi-Head Attention** — multiple attention patterns in parallel
- **Feed-Forward Networks** — process each position independently
- **Positional Encoding** — inject sequence order information

## Using Hugging Face Transformers
```python
from transformers import pipeline

# Sentiment analysis
classifier = pipeline("sentiment-analysis")
result = classifier("I love learning about AI!")
print(result)

# Text generation
generator = pipeline("text-generation", model="gpt2")
output = generator("The future of AI is", max_length=50)
print(output[0]['generated_text'])
```

## Fine-tuning Basics
```python
from transformers import AutoModelForSequenceClassification, Trainer

model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2
)
# ... set up Trainer with your dataset
```

## 🏋️ Exercise
Use the Hugging Face pipeline to perform sentiment analysis on 3 different sentences.
""",
                "code_template": "# Note: This requires the transformers library\n# For the playground, we'll simulate the output\n\nsentences = [\n    'I love Python programming!',\n    'This bug is so frustrating.',\n    'Machine learning is fascinating.'\n]\n\n# Simulate sentiment analysis\nfor s in sentences:\n    sentiment = 'POSITIVE' if any(w in s.lower() for w in ['love', 'fascinating', 'great']) else 'NEGATIVE'\n    print(f'{s} -> {sentiment}')\n",
                "expected_output": "POSITIVE",
            },
        ],
    },
]


async def seed_courses():
    """Insert curriculum data if courses table is empty."""
    async with async_session() as session:
        result = await session.execute(select(Course).limit(1))
        if result.scalar_one_or_none():
            return  # Already seeded

        for course_data in CURRICULUM:
            modules_data = course_data.pop("modules")
            course = Course(**course_data)
            session.add(course)
            await session.flush()

            for mod_data in modules_data:
                module = Module(course_id=course.id, **mod_data)
                session.add(module)

        await session.commit()
        print("✅ Curriculum seeded successfully!")
