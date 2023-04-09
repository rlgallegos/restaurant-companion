from subprocess import PIPE, Popen, run
import time

# Setup Environment
run(['pipenv', 'install'])
time.sleep(1)
run(['pipenv', 'shell'], stdin=True)