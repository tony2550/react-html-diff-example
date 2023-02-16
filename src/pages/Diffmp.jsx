import React, { useEffect, useState } from "react";
import { diff_match_patch } from "diff-match-patch";
import "./Diffmp.css";

const oldHTML = `<h5>CHAPTER 2&nbsp; 에너지관리수단의 식별</h5><p>&nbsp;</p><p>&nbsp;</p><h6>2.1 온실가스 감축 잠재량</h6><p>&nbsp;</p><p>2.1.1 Second IMO GHG study의 연구결과에 따르면 해운은 현재 사용 가능한 기술 및 운항방법만을 선택함으로써 현재 기준보다 약 25% ~ 75% 까지의 온실가스 감축이 가능하다고 예상하고 있라고</p><p><img src='' contenteditable='false'>* Assessment of potential reductions of CO2 emissions from shipping by using known technology and practices<br></p>`;

const newHTML = `<h5>CHAPTER 2&nbsp; 에너지관리수단의 식별</h5><p>&nbsp;</p><p>&nbsp;</p><h6>2.1 온실가스 감축 잠재량</h6><p>&nbsp;</p><p>2.1.1 Second IMO GHG study의 연구결과에 따르면 해운은 현재 사용 가능한 기술 및 운항방법만을 선택함으로써 현재 기준보다 약 25% ~ 75% 까지의 온실가스 감축이 가능하다고 예상하고 있다고한다.</p><p><img src='' contenteditable='false'>* Assessment of potential reductions of CO2 emissions from shipping by using known technology and practices<br></p><img src='https://sdenet-rulebook-storage.s3-ap-northeast-2.amazonaws.com/b6a94564-9c3d-48ee-ae0e-aaa6eb6e0314.png' alt='alt_text' contenteditable='false'><br></p><p><br></p><p>2.1.1&nbsp; 또한 DNV에서 행한 최근의 연구결과에 따르면 향후 개발이 예상되는 모든 기술을 적용 하였을 시 2030년 경에는 현재보다 약 30%정도 온실가스 감축이 가능하다고 예상하고 있다.</p>`;

const Diffmp = () => {
  const [diffold, setDiffold] = useState("");
  const [diffnew, setDiffnew] = useState("");

  useEffect(() => {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(oldHTML, newHTML);
    dmp.diff_cleanupSemantic(diffs);
    // dmp.diff_prettyHtml(diffs);
    let htmlold = "";
    let htmlnew = "";
    for (let i = 0; i < diffs.length; i++) {
      const diff = diffs[i];
      const [operation, text] = diff;

      // if (text.includes("<img")) {
      //   html += text;
      // }
      console.log(diff);
      if (operation === 0) {
        htmlold += text;
        htmlnew += text;
      } else if (operation === 1) {
        htmlnew += `<ins>${text}</ins>`;
      } else if (operation === -1) {
        if (!text.includes("<img")) {
          htmlold += `<del style='background-color: red;'>${text}</del>`;
        } else {
          htmlold += text.replace("<img", `<img style='border: 3px solid red'`);
        }
      }
    }
    console.log(dmp.diff_prettyHtml(diffs));
    setDiffold(htmlold);
    setDiffnew(htmlnew);
  }, []);

  return (
    <div className="diffmp-container">
      <div className="old-left">
        <div className="old-left-title">old</div>
        <div className="old-left-contentwrap">
          <div dangerouslySetInnerHTML={{ __html: diffold }}></div>
        </div>
      </div>
      <div className="new-right">
        <div className="new-right-title">new</div>
        <div className="new-right-contentwrap">
          <div dangerouslySetInnerHTML={{ __html: diffnew }}></div>
        </div>
      </div>
    </div>
  );
};

export default Diffmp;
