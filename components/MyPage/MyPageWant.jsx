import React from "react";
import styled, { css } from "@emotion/native";
import BookBox from "../Home/BookBox";
import { useState, useEffect } from "react";

// bookbox 때문에 일시적으로 만든 것
export default function MyPageWant({ bookMarkFilter }) {
  // console.log(bookMarkFilter);
  // 신간도서 state
  const [recentBooks, setRecentBooks] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  // 로딩 state
  const [isLoading, setIsLoading] = useState(true);
  // 신간도서 request url
  const BASE_URL = "http://book.interpark.com/api/newBook.api";
  const BEST_BASE_URL = "https://book.interpark.com/api";
  // api key
  const API_KEY =
    "CAD800FCCF43A0A4B5BAD86C45EFCBC99D6140870C5C960566AE4D254543570F";
  //신간도서 api 가져오기
  const getApiRecentBooks = async () => {
    const { item } = await fetch(
      `${BASE_URL}?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setRecentBooks(item);
    // setIsLoading(false);
  };

  //API 가져오는 함수
  const getBestSeller = async () => {
    const { item } = await fetch(
      `${BEST_BASE_URL}/bestSeller.api?key=${API_KEY}&categoryId=100&output=json`
    ).then((res) => res.json());
    setBestSeller(item);
    // setIsLoading(false);
  };

  useEffect(() => {
    getBestSeller();
    getApiRecentBooks();
  }, []);

  // 최근 구조
  const recent = recentBooks.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < bookMarkFilter.length; i++) {
      if (item.itemId === bookMarkFilter[i]) {
        return item;
      }
    }
    // return bookMarkFilter.filter((book) => {
    //   // console.log(item.itemId);
    //   // console.log(book);
    //   return item.itemId === book;
    // });
    // const bookMarkFilter.include(item.itemId);
  });
  // console.log("bookMarkFilter", bookMarkFilter);
  // console.log(recent);
  const best = bestSeller.filter((item) => {
    //item의 id가 bookMarkFilter배열 안에 존재한다면 (if) 리턴해주고 아니면 아무것도 안함
    for (let i = 0; i < bookMarkFilter.length; i++) {
      if (item.itemId === bookMarkFilter[i]) {
        return item;
      }
    }
    // return bookMarkFilter.filter((book) => {
    //   // console.log(item.itemId);
    //   // console.log(book);
    //   return item.itemId === book;
    // });
    // const bookMarkFilter.include(item.itemId);
  });

  return (
    <>
      <MyPageWantTitleView>
        <MyPageWantTitleText>내가 읽은 책</MyPageWantTitleText>
      </MyPageWantTitleView>

      <MyPageWantContentsView>
        {/*나중에 렌더링 할 것을 props로 보내줘야함 */}
        {/* 파이어스토어 컬렉션과 api를 가져와서 컬렉션에있는 id는 유저id와 대조후 맞는 것만 출력
        그거중에 책 아이디를 가져와서 api 책 id와 filter후 map */}
        {recent.map((book) => {
          return (
            <MyPageWantContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageWantContentsBookView>
          );
        })}
        {best.map((book) => {
          return (
            <MyPageWantContentsBookView key={book.itemId}>
              <BookBox book={book} />
            </MyPageWantContentsBookView>
          );
        })}
      </MyPageWantContentsView>
    </>
  );
}
const MyPageWantTitleView = styled.View`
  background-color: #cdff40;
  width: 90%;
  height: 40px;
  margin: 0 auto 25px auto;
  border-radius: 7px;
`;
const MyPageWantTitleText = styled.Text`
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
const MyPageWantContentsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;
const MyPageWantContentsBookView = styled.View`
  margin-bottom: 20px;
`;
