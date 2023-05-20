import React from "react";
import style from "./style.module.scss";
import { icons } from "../../helpers/images";
import Card from "components/Common/Card";

function SubMenu({ data }) {
  return (
    <section className={style.subSection}>
      <div className="d-flex">
        <div className={`me-3 ${style.sideLogo}`}>
          <img src={icons.home} />
        </div>
        {data &&
          data.map((e) => (
            <Card
              key={e.subCategoryId}
              categoryName={e.subCategoryName}
              imageUrl={e.subCategoryImageURL}
              className={style.subCategoryCard}
              index={e.subCategoryId}
            />
          ))}
      </div>
    </section>
  );
}

export default SubMenu;
