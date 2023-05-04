import subprocess

# Development Servers
subprocess.run(['kill $(lsof -t -i:4000)'], shell=True)
subprocess.run(['kill $(lsof -t -i:5555)'], shell=True)

# Production Server
# subprocess.run(['kill $(lsof -t -i:8000)'], shell=True)