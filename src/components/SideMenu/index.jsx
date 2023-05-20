import React, { useState } from "react";
import style from "./style.module.scss";
import { images } from "../../helpers/images";
import { sideBarData } from "helpers/constant";

function SideMenu() {
  const [active ,setActive] = useState(1)
  return (
    <section className={style.sideSection}>
      <div className="d-flex align-items-center mb-5">
        <img src={images.logo} className={`me-3 ${style.sideLogo}`} />
        <h6>A.T . Inks</h6>
      </div>
      <div>
        {sideBarData.map((e,i) => (
          <div className={`${style.menu} ${active == i ? style.active : ''}`} key={i}>
            <img src={e.image} className={style.sideMenuIcon} style={{color : 'gray'}}/>
            <p className="mb-0">{e.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SideMenu;
