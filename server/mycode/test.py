import httplib

conn = httplib.HTTPConnection("http://192.168.5.88:8080")
conn.request("GET", "/doudizhu.zip")
r1 = conn.getresponse()
print r1.status, r1.reason

data1 = r1.read()
print data1
conn.close()