import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/home/Cards";
const Important = () => {
  return (
    <div>
      <Cards home={false} />
    </div>
  );
};

export default Important;
