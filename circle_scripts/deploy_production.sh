#!/bin/bash
# Deploy this theme in the demos repository on the master branch, which is the stagging one

# let's set some variables
E_XCD=86       # Can't change directory?
THEME_NAME=timber
BRANCH=master

echo "Init Deploy ..."

cd ../ || {
    echo "Cannot change to necessary directory." >&2
    exit $E_XCD;
}


echo "Cloning demos ..."

git config --global user.name GITHUB_USER
git config --global user.email "andrei.lupu@pixelgrade.com"

git clone https://GITHUB_USER:GITHUB_PASS@github.com/pixelgrade/demo_tester.git -b master

# list just to see where am I
ls

echo "Move theme in demos"

cp -R THEME_NAME demo_tester/wp-content/themes || {
    echo "Cannot copy in demos." >&2
    exit $E_XCD;
}

echo "Go in demos"

cd ./d/wrap/t/ || {
    echo "Cannot change dir in demos." >&2
    exit $E_XCD;
}


#echo "Commit new theme"
#git add .
#git commit -m "auto-commit"

#echo "Push new theme"

#git push origin master

echo "Done thing"
exit 0