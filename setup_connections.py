# import subprocess
# from subprocess import Popen,  run
import os
import subprocess


# Setup Frontend Port 4000
subprocess.Popen(['npm', 'start', '--prefix', 'client'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Popen - Python code continues executing as soon as the process is spawned

# Setup Backend Port 5555
subprocess.run(['python', 'server/app.py'])


