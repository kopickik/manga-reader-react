# Manga Reader React App Services

Two of the same things at the same time.

## Setting up mongodb

```sh
docker run -p 0.0.0.0:37017:27017 --name manga-reader-react-svc -d mongo:4.2.6
```

```ascii
MODELS
##########  #############  ############
# manga  #  # mangaInfo #  # chapters #
##########  #############  ############
```
