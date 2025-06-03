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
        <p>&copy; 2023 My EC2 Web Server</p>
    </footer>
</body>
</html>
EOF

# Restart Apache to apply changes
sudo systemctl restart httpd
