from subprocess import PIPE, Popen
import subprocess


p = Popen(['PGPASSWORD=MzXYvPcBwXVyQy43aTFxA02hmyHEkWyB psql -h dpg-cgngl8bldisfgrv47mpg-a.ohio-postgres.render.com -U rlgallegos85 dbcapstone_yi94'], shell=True, stdin=PIPE)

# p.stdin.write(b'SELECT * FROM allergies;\n')
# p.stdin.write(b'SELECT * FROM menu_items;\n')
# p.stdin.write(b'SELECT * FROM menu_item_allergies;\n')


# p.stdin.write(b'SELECT * FROM orders;\n')
# p.stdin.write(b'SELECT * FROM order_items;\n')
# p.stdin.write(b'SELECT * FROM order_item_allergies;\n')


# p.stdin.write(b'SELECT * FROM users;\n')
p.stdin.write(b'SELECT * FROM restaurants;\n')
p.communicate(b'')

