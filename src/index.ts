// 기본 타입 예제
const name: string = "TypeScript";
const age: number = 5;
const isAwesome: boolean = true;

// 배열과 객체 타입 예제
const languages: string[] = ["JavaScript", "TypeScript", "Python"];
const person: { name: string; age: number } = {
  name: "John",
  age: 30
};

// 함수 타입 예제
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 인터페이스 예제
interface User {
  id: number;
  name: string;
  email?: string; // 선택적 프로퍼티
}

const user: User = {
  id: 1,
  name: "Jane"
};

// 실행
console.log(greet(name));
console.log("Languages:", languages);
console.log("User:", user); 