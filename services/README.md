# Manga Reader React App Services

Two of the same things at the same time.

## Setting up mongodb

```sh
docker run -p 0.0.0.0:37017:27017 --name manga-reader-react-svc -d mongo:4.2.6
```

```ascii
MODELS
##########
# manga  #
##########
|-id
|-alias
|-categories
|-image
|-lastChapterDate
|-title
|-info
||-aka
||-artist_kw
||-author_kw
||-categories
||-chapters
|||-id,lastUpdated,title,number
||-title_kw
||-alias
||-artist
||-author
||-chapters_len
||-description
||-hits
||-image
||-language
||-last_chapter_date
||-released
||-startsWith
||-title
||-type
||-url
```
