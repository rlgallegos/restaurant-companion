import subprocess

subprocess.run(['kill $(lsof -t -i:4000)'], shell=True)
subprocess.run(['kill $(lsof -t -i:5555)'], shell=True)
