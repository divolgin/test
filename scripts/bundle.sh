set -e

OUTPUTDIR=$(mktemp -d)
BUNDLENAME=./manual-support-data.tar.gz

kubectl get pods -A 1>> $OUTPUTDIR/get-pods.log 2>> $OUTPUTDIR/get-pods.err
kubectl describe pods -A 1>> $OUTPUTDIR/describe-pods.log 2>> $OUTPUTDIR/describe-pods.err
df -kh 1>> $OUTPUTDIR/df.log 2>> $OUTPUTDIR/df.err
docker info 1>> $OUTPUTDIR/docker-info.log 2>> $OUTPUTDIR/docker-info.err

tar -zcvf $BUNDLENAME $OUTPUTDIR
rm -rf $OUTPUTDIR

echo "Bundle is in $BUNDLENAME"
