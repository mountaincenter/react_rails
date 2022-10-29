import { Link } from "react-router-dom"

export const TextToLink = (comment: any) => {
  // 正規表現でURLを抽出
  const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  let linkedComment = comment.replace(regexp_url, '<a href="$1">$1</a>');

  // 正規表現で#を抽出
  const regexp_hash = /#+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
  linkedComment = linkedComment.replace(
    regexp_hash,
    // '<a href="/search?q=$1&type=hash">#$1</a>'
    '<a href="javascript:void(0)" onClick="hoge()">#$1</a> <script>function hoge() {console.log("hoge")}</script>'
    // '#$1'
    );
  // const regexp_hash = /#+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
  // linkedComment = linkedComment.replace(
  //   regexp_hash,
  //   // '<a href="/search?q=$1&type=hash">#$1</a>'
  //   '<a href="/hashtag/$1">#$1</a>'
  // );

  // 正規表現で@を抽出
  const regexp_at = /@+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
  linkedComment = linkedComment.replace(
    regexp_at,
    '<a href="/search?q=$1&type=at">@$1</a>'
  );

  // return <Link to="/">{linkedComment}</Link>
  return linkedComment

};