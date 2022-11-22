## Next実行コマンド
```
cd client
npm run dev
```

## 新しくフロント側でパッケージを追加した時
```
npm install
```

## ローカルでバックエンドを立てるためのDockerコマンド
※.envファイルが必要なのでそれはDMで渡します
```
cd server
docker-compose up -d
```

Dockerを閉じるとき
```
docker-compose down
```

## gitのコマンド

### 作業ブランチのはやしかた
基本的に作業ブランチはdevelopからはやしてください
```
git checkout develop
git pull
git checkout -b <作業ブランチ名>
```
