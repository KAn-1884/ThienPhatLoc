export function numberToVietnameseWords(number) {
  if (number === 0) return "Không đồng";

  const dv = ["", "nghìn", "triệu", "tỷ"];
  const cs = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];

  function readTriple(num) {
    let tr = Math.floor(num / 100);
    let ch = Math.floor((num % 100) / 10);
    let dv_ = num % 10;
    let str = "";

    if (tr > 0) {
      str += cs[tr] + " trăm";
      if (ch === 0 && dv_ > 0) str += " linh";
    }

    if (ch > 1) {
      str += " " + cs[ch] + " mươi";
      if (dv_ === 1) str += " mốt";
      else if (dv_ === 5) str += " lăm";
      else if (dv_ > 0) str += " " + cs[dv_];
    } else if (ch === 1) {
      str += " mười";
      if (dv_ === 1) str += " một";
      else if (dv_ === 5) str += " lăm";
      else if (dv_ > 0) str += " " + cs[dv_];
    } else if (ch === 0 && dv_ > 0 && tr === 0) {
      str += cs[dv_];
    }

    return str.trim();
  }

  let i = 0;
  let result = "";
  while (number > 0) {
    const block = number % 1000;
    if (block > 0) {
      const prefix = readTriple(block);
      result = prefix + " " + dv[i] + " " + result;
    }
    number = Math.floor(number / 1000);
    i++;
  }

  return result.trim().replace(/\s+/g, " ") + " đồng chẵn";
}
