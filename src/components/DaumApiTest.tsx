import React from "react";

const DaumApiTest: React.FC = () => {
    const openAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data: any) {
                console.log("주소: ", data.address);
                console.log("우편번호: ", data.zonecode);
            },
        }).open();
    };
    return <button onClick={openAddress}>주소검색</button>;
};

export default DaumApiTest;