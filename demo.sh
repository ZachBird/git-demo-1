if [ -z $1 ]; then
  echo '请输入要新建的目录名'
  exit 1
elif [ -d $1 ]; then
  echo '目录已存在'
  exit 1
else
  mkdir $1
  cd $1
  mkdir css js
  touch index.html css/style.css js/main.js
  printf '<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>' > index.html
  printf 'h1 {color: red;}' > css/style.css
  echo -e "var string = 'Hello World' \nalert(string)" > js/main.js
  echo -e 'Successful\a'
  exit 0
fi
