(async () => {
  async function func1() {
    setTimeout(() => {
      console.log("fun1");
    });

    console.log("test");

    return new Promise((resolve, reject) => {
      reject("1");
    });
  }

  /*  func1().then((x) => {
    ///
    console.log(x);
  }); */

  func1().then(function (x) {
    ///
    console.log(x);
  });

  /*   const y = await func1();
  console.log(y); */
})();
