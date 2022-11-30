import React, { useState } from "react";
import "./App.css";

function CustomButton(props) {
  let k = "";
  let color = "";
  if (props.stat == 0) {
    k = "완료";
    color = "blue";
  } else {
    k = "취소";
    color = "green";
  }
  return (
    <button
      style={{ borderColor: color }}
      className="btn_child"
      onClick={props.onClick}
    >
      {k}{" "}
    </button>
  );
}
function Done(props) {
  return (
    <div className="w_child">
      <div className="w_c_title">{props.text.title}</div>
      <div className="w_c_content">{props.text.content}</div>
      <div className="w_c_button">
        <button
          className="btn_child"
          onClick={() => {
            props.handleDelete(props.text.id);
          }}
        >
          삭제
        </button>
        <CustomButton
          stat={props.text.stat}
          onClick={() => {
            props.handleUpdate(props.text.id, props.text.stat);
          }}
        ></CustomButton>
      </div>
    </div>
  );
}
function Working(props) {
  return (
    <div className="w_child">
      <div className="w_c_title">{props.text.title}</div>
      <div className="w_c_content">{props.text.content}</div>
      <div className="w_c_button">
        <button
          className="btn_child"
          onClick={() => {
            props.handleDelete(props.text.id);
          }}
        >
          삭제
        </button>
        <CustomButton
          stat={props.text.stat}
          onClick={() => {
            props.handleUpdate(props.text.id, props.text.stat);
          }}
        ></CustomButton>
      </div>
    </div>
  );
}
function App() {
  const [texts, setTexts] = useState([
    { id: 1, title: "LoremIpsum", stat: 0, content: "Blar blar blar" },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  /*stat이 굳이 state로 관리해야 하나.? 어차피 text가 다 처리하는데..?
 state를 직접 수정하는건 안돼지만 복사해서 새로 만들고 그안에서 주면되는거 아닌가?.. */
  const addTextHandler = () => {
    const newText = {
      id: texts.length + 1,
      title: title,
      stat: 0,
      content: content,
    };
    setTexts([...texts, newText]);
    setTitle("");
    setContent("");
  };
  const deleteTextHandler = (id) => {
    const newTextList = texts.filter((text) => text.id !== id);
    setTexts(newTextList);
  };

  const updateTextHandler = (id) => {
    const tempText = Array.from(texts);

    console.log(tempText[id - 1]);

    if (tempText[id - 1].stat == 0) {
      tempText[id - 1].stat = 1;
      //console.log(tempText);
      const newUpList = tempText;
      setTexts(newUpList);
    } else if (tempText[id - 1].stat == 1) {
      tempText[id - 1].stat = 0;
      //console.log(tempText);
      const newUpList = tempText;
      setTexts(newUpList);
    }
  };

  return (
    <div id="layout">
      {/* 일단 렌더링이 되려면 무조건 div 안에 있어야만 한다! */}
      <header id="header">
        <div className="h_left">My Todo List</div>
        <div className="h_right">React!</div>
      </header>
      <div id="input_box">
        <div id="ib_form">
          <div id="ib_input">
            <label>제목 :</label>
            <input
              value={title}
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>내용 :</label>
            <input
              value={content}
              placeholder="내용"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div id="ib_button">
            <button onClick={addTextHandler}>추가하기</button>
          </div>
        </div>
      </div>
      <h1>Working.. 🔥</h1>
      <div className="viewzone">
        {texts.map((text) => {
          if (text.stat == 0) {
            return (
              <Working
                text={text}
                key={text.id}
                handleDelete={deleteTextHandler}
                handleUpdate={updateTextHandler}
              ></Working>
            );
          } else {
            return null;
          }
        })}
      </div>
      <h1>Done..! 🎉</h1>
      <div className="viewzone">
        {texts.map((text) => {
          if (text.stat == 1) {
            return (
              <Done
                text={text}
                key={text.id}
                handleDelete={deleteTextHandler}
                handleUpdate={updateTextHandler}
              ></Done>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div></div>
    </div>
  );
}

export default App;
