### Python3 環境建置

```bash
$ pipenv run pip list

$ pipenv run pip -V
```

## 安裝 pytest
```bash
$ pipenv run pip install pytest
```

## 建立新的問題
輸入兩個參數，題號和題目名稱。(預設是 0 和 example)
```bash
$ ./template_builder.py     1     two_sum
#                           ^      ^
#                           題號   題目名稱
```

## 測試你的答案
```
$ pipenv run pytest
```