#!/bin/bash
# Update system package repository
sudo yum update -y

# Install Apache (httpd)
sudo yum install -y httpd

# Start Apache service
sudo systemctl start httpd

# Enable Apache to start at boot
sudo systemctl enable httpd

# Create a custom HTML file
cat <<EOF > /var/www/html/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to My Website</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        header {
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin: 0;
            font-size: 2.5rem;
        }
        main {
            background-color: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        section, article {
            margin-bottom: 30px;
        }
        h2 {
            color: #2c3e50;
            border-bottom: 2px solid #ecf0f1;
            padding-bottom: 10px;
        }
        ul {
            background-color: #ecf0f1;
            padding: 20px 20px 20px 40px;
            border-radius: 8px;
        }
        li {
            margin-bottom: 10px;
        }
        footer {
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background-color: #2c3e50;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        p {
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <header>
        <h1>Hello, World!</h1>
    </header>
    <main>
        <section>
            <p>This is a custom HTML page served from my Apache server on EC2.</p>
            <p>Welcome to my website. This server is running on Amazon EC2.</p>
        </section>
        <article>
            <h2>About This Server</h2>
            <p>This page demonstrates a basic Apache web server configuration.</p>
            <ul>
                <li>Running on Amazon EC2</li>
                <li>Powered by Apache</li>
                <li>Configured with a Bash script</li>
            </ul>
        </article>
    </main>
    <footer>
        <p>&copy; 2025 EC2 Web Server</p>
    </footer>
</body>
</html>
EOF

# Restart Apache to apply changes
sudo systemctl restart httpd
