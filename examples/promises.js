




const b = new Promise((resolve, reject) => {
  let condition = true;
  if (condition) {
    resolve("data");
  } else {
    reject("error");
  }
});

const runOk = () => console.log("all good");
const failed = () => console.log("we suck");

b.then(runOk).catch(failed);