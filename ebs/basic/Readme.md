## Volume Management

```sh
df -h
lsblk
sudo file -s /dev/xvda1
sudo file -s /dev/sdh
sudo mkfs -t xfs /dev/sdh
sudo mkdir /newvolume
sudo mount /dev/sdh /newvolume
```
