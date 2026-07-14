# 🚛 Predictive Vehicle Maintenance with Road Analysis using Machine Learning

An AI-powered predictive maintenance system that combines vehicle operational data, maintenance history, environmental conditions, and road analysis to predict maintenance requirements before failures occur.

---

## 📖 Project Overview

Unexpected vehicle failures increase maintenance costs, vehicle downtime, and operational risks, especially in commercial logistics fleets. Traditional maintenance strategies rely on fixed service schedules or mileage intervals, often leading to unnecessary servicing or delayed maintenance.

This project proposes a **Machine Learning-based Predictive Maintenance System** that analyzes historical maintenance records, vehicle health parameters, operational conditions, and road information to predict whether a vehicle requires maintenance. The proposed framework also compares model performance on the original dataset and a SMOTE-balanced dataset to improve prediction reliability.

---

## 🎯 Problem Statement

Current predictive maintenance systems primarily depend on vehicle operational and historical maintenance data while giving limited consideration to environmental factors and road conditions.

This project addresses these limitations by:

- Predicting maintenance requirements before failures occur.
- Studying the influence of operational and environmental conditions.
- Comparing machine learning models with and without SMOTE.
- Building a robust predictive maintenance pipeline suitable for logistics fleet vehicles.

---

## 🎯 Objectives

- Analyze logistics fleet maintenance data.
- Perform exploratory data analysis and feature engineering.
- Identify and remove feature leakage.
- Compare machine learning models using original and SMOTE-balanced datasets.
- Predict whether maintenance is required.
- Evaluate model performance using multiple evaluation metrics.
- Prepare the model for future deployment.

---

# 🚀 Key Features

- 🚚 Logistics Fleet Vehicle Maintenance Prediction
- 📊 Exploratory Data Analysis (EDA)
- 🔍 Feature Leakage Detection
- ⚖️ Class Imbalance Analysis using SMOTE
- 🤖 Multiple Machine Learning Models
- 📈 Comprehensive Model Evaluation
- 💾 Model Serialization using Joblib
- 🌐 Ready for Future Web Deployment

---

# 🏗 Project Workflow

```text
               Logistics Vehicle Dataset
                         │
                         ▼
              Dataset Understanding
                         │
                         ▼
        Exploratory Data Analysis (EDA)
                         │
                         ▼
          Feature Leakage Identification
                         │
                         ▼
              Feature Selection
                         │
                         ▼
             Data Preprocessing
                         │
                         ▼
            Train-Test Split (80:20)
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   Original Dataset              SMOTE Dataset
          │                             │
          ▼                             ▼
   Machine Learning Models      Machine Learning Models
          │                             │
          └──────────────┬──────────────┘
                         ▼
                 Model Evaluation
                         │
                         ▼
              Hyperparameter Tuning
                         │
                         ▼
                Best Model Selection
                         │
                         ▼
                Model Deployment
```

---

# ⚙️ Methodology

### 1️⃣ Dataset Collection

- Logistics Vehicle Maintenance History Dataset
- Source: Kaggle
- 250,000 Records
- 50 Features

### 2️⃣ Dataset Understanding

- Missing Value Analysis
- Duplicate Detection
- Data Type Analysis
- Statistical Summary

### 3️⃣ Exploratory Data Analysis

- Feature Distribution
- Correlation Analysis
- Class Distribution
- Outlier Detection

### 4️⃣ Feature Leakage Analysis

Identify and remove features that may unintentionally reveal the target variable.

### 5️⃣ Feature Selection

Remove irrelevant and redundant variables to improve model performance.

### 6️⃣ Data Preprocessing

- Label Encoding
- One-Hot Encoding
- Feature Scaling (where required)

### 7️⃣ Model Development

Experiments performed:

- Original Dataset
- SMOTE Balanced Dataset

Models:

- Logistic Regression
- Decision Tree
- Random Forest
- XGBoost

### 8️⃣ Model Evaluation

Evaluation Metrics:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- Confusion Matrix

### 9️⃣ Hyperparameter Optimization

Improve the best-performing model using parameter tuning.

### 🔟 Deployment

Save the final trained model using **Joblib** for future web application integration.

---

# 📂 Dataset

| Attribute | Value |
|-----------|-------|
| Source | Kaggle |
| Domain | Logistics Fleet Predictive Maintenance |
| Records | 250,000 |
| Features | 50 |
| Target | Maintenance_Required |

### Vehicle Types

- 🚚 Heavy Truck
- 🚛 Medium Truck
- 🚐 Light Truck
- ❄️ Refrigerated Truck
- ⚡ Electric Truck

### Feature Categories

- Vehicle Information
- Operational Data
- Environmental Conditions
- Vehicle Health Parameters
- Maintenance History
- Telematics Data

---

# 🛠 Technology Stack

| Category | Tools |
|----------|-------|
| Programming | Python |
| Data Processing | Pandas, NumPy |
| Machine Learning | Scikit-learn, XGBoost |
| Data Balancing | SMOTE |
| Visualization | Matplotlib, Seaborn |
| Model Storage | Joblib |
| Development | Google Colab |

---

# 📊 Evaluation Metrics

The developed models are evaluated using:

- Accuracy
- Precision
- Recall
- F1-Score
- ROC-AUC
- Confusion Matrix

---

# 📚 References

### Base Paper

Mahiyudin, G., Hussain, M., & Dewi, D. D.

*A Comprehensive Study on Predicting the Need for Vehicle Maintenance Using Machine Learning.*

Engineering Proceedings, 2025.

### Related Papers

- Predictive Maintenance Enabled by Machine Learning: Use Cases and Challenges in the Automotive Industry (2021)

- Machine Learning Applications in Predictive Maintenance for Vehicles: Case Studies (2022)

- Predictive Maintenance of Armoured Vehicles Using Machine Learning Approaches (2023)

---

# 🚀 Future Scope

- Real-time OBD-II integration
- Live telematics data
- Road image analysis using Computer Vision
- Explainable AI (SHAP/LIME)
- Fleet Management Dashboard
- Mobile & Web Deployment

---

# 👩‍💻 Authors

- **Ragavi K**
- **Medhuna P**
- **Praveena S**
