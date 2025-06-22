# Create Secret via Secrets Manager

```sh
aws secretsmanager create-secret \
--name MyRdsPassword \
--description "My rds password - created with CLI" \
--secret-string "{\"password\":\"mypassword\"}"
```

# Install Postgres Client on EC2 Instance AML2023 X86

sudo dnf install postgresql15.x86_64 postgresql15-server -y

# Connection String URL

> postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]

```sh
postgresql://hiranyagarbh:mypassword@rds-basic-rdsinstance-gtexpmvyhpqk.c6rgwyy8sq0i.us-east-1.rds.amazonaws.com:5432/mydatabase
```

# Create a table

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
