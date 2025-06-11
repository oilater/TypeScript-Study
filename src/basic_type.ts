/**
 * 객체(Object)
 * object는 원시 타입이 아닌 타입을 나타낸다.
 * number, string, boolean, bigint, symbol, null, undefined가 아닌 나머지를 의미
 */

// object 타입을 쓰면 Object.create 같은 API가 더 잘나타남
declare function create(o: object | null): void 

create({prop: 0}); // 성공 
create(null); // 성공

// create(42); // 오류
// create("string"); // 오류
// create(false); // 오류
// create(undefined); // 오류

// 타입 단언 (Type assertions)
// 컴파일러에게 "날 믿어, 난 내가 뭘 하고 있는지 알아"라고 말해주는 방법

// 1. angle bracket 사용
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

// 2. as 키워드 사용 (JSX에서 사용할 때는 as 키워드만 허용)
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

