/**
 * 인터페이스
 * 
 * 타입 검사는 '값의 형태'에 초점을 맞춘다.
 * => duck typing, structural typing
 * 
 * 인터페이스는 이런 타입들의 이름을 짓고,
 * 코드 안의 계약을 정의할 뿐만 아니라,
 * 프로젝트 외부에서 사용하는 코드의 계약을 정의함
 */

import { log } from "console";

function printLabel(labeledObject: {label: string}) {
    console.log(labeledObject.label);
}

// 더 많은 프로퍼티가 있지만 printLabel에서는 최소한 필요한 프로퍼티가 있는지와 타입이 맞는지 검사
let myObject = {size: 10, label: "Size 10 Object"};
printLabel(myObject);


interface LabeledValue {
    label: string;
}

function printLabel2(labeledObject: LabeledValue) {
    console.log(labeledObject.label);
}

// 마찬가지로 함수에 전달된 객체가 나열된 요구 조건을 충족하면, 허용
// 프로퍼티들의 순서를 요구하지 않음
let myObj = {size: 10, label: "Size 10 Object"};
printLabel2(myObj);

// 선택적 프로퍼티 (Optional Properties)
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string, area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }

    if (config.width) {
        newSquare.area = config.width * config.width;
    }

    return newSquare;
}

// 읽기 전용 프로퍼티 (Readonly properties)
// 일부 프로퍼티들은 객체가 처음 생성될 때만 수정 가능해야 한다.
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = {x: 10, y: 20};
// p1.x = 1; // 오류


// TypeScript에서는 읽기 전용 배열 생성 가능
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 4; // 오류
// ro.push(5); // 오류
// ro.length = 100; // 오류
// a = ro; // 오류

// 타입 변환으로 오버라이드하는 것은 가능
a = ro as number[];


// 초과 프로퍼티 검사 (Excess Property Checks)

interface SquareConfig {
    color?: string;
    width?: number;
}

// function createSquare(config: SquareConfig): {color: string, area: number} {
//     // ...
// }

// let mySquare = createSquare({aasdf: "red", width: 100});

// width 프로퍼티는 적합하고, color 프로퍼티는 없고, 
// 추가 colour 프로퍼티는 중요하지 않기 때문에, 
// 이 프로그램이 올바르게 작성되었다고 생각된다.

// 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 특별한 처리를 받고, 
// 초과 프로퍼티 검사 (excess property checking)를 받는다.
// 만약 객체 리터럴이 "대상 타입 (target type)"이 갖고 있지 않은 프로퍼티를 갖고 있으면, 에러가 발생

// 초과 프로퍼티 검사를 피하는 방법
// 1. 타입 단언
let mySquare = createSquare({aasdf: "red", width: 100} as SquareConfig);

// 추가 프로퍼티가 있음을 확신한다면, 문자열 인덱스 서명(string index signatuer)을 추가하는 것이 더 나은 방법

interface TriangleConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 2. 변수에 할당
// squareOptions가 추가 프로퍼티 검사를 받지 않기 때문에, 컴파일러는 에러를 주지 않음
let sqaureOptions = {colour: "red", width: 100};
let mySquare2 = createSquare(sqaureOptions);

// squareOptions와 SquareConfig 사이에 공통 프로퍼티가 있는 경우에만 위와 같은 방법을 사용 가능
// => 웬만하면 쓰지 말자

// 함수 타입 (Fucntion Types)

// 인터페이스는 JavaScript 객체가 가질 수 있는 넓은 범위의 형태를 기술할 수 있다. 
// 프로퍼티로 객체를 기술하는 것 외에, 인터페이스는 함수 타입을 설명할 수 있다.

// 인터페이스에 호출 서명 (call signature)를 전달
// => 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷, 매개변수는 이름과 타입이 모두 필요

interface SearchFunc {
    (source: string, subString: string): boolean;
}

// 함수 타입 인터페이스는 다른 인터페이스처럼 사용할 수 있음

// 함수 타입의 변수를 만들고, 같은 타입의 함수 값으로 할당하는 방법
let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) => {
    // let result = source.search(subString);
    // return result > -1;
// }

// 매개변수 이름 달라도 됨
// mySearch = function(src: string, sub: string) => {
    // let result = src.search(sub);
    // return result > -1;
// }

// 문맥상 타이핑 (contextual typing)이 인수 타입을 추론할 수 있다
// mySearch = function(src, sub) => {
    // let result = src.search(sub);
    // return result > -1;
// }

// 인덱서블 타입 (Indexable Types)
// a[10] 이나 ageMap["daniel"] 처럼 타입을 "인덱스로" 기술
// 인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 
// 타입을 기술하는 인덱스 시그니처 (index signature)를 가지고 있음

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 인덱스 서명을 지원하는 타입에는 두 가지가 있음: 문자열과 숫자
// 숫자 인덱서에서 반환된 타입은 반드시 문자열 인덱서에서 반환된 타입의 하위 타입(subtype)이어야 함.

// class Animal {
//     name: string;
// }

// class Dog extends Animal {
//     breed: string;
// }


// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 될 것입니다!
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// }

// 쉽게 이해하기
const arr = ["a", "b", "c"];
console.log(arr[0]); // "a", 0이 내부적으로 문자열 "0"로 변환됨
console.log(arr["0"]); // "a"

// 문자열 인덱스 시그니처는 모든 프로퍼티들이 반환 타입과 일치하도록 강제
interface NumberDictionary {
    [index: string]: number;
    length: number;
    // name: string; // 오류
}

interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;
    name: string;
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
// myArray2[0] = "Mallory"; // 오류


// 클래스 타입 (Class Types)

// 인터페이스 구현하기
// interface ClockInterface {
//     currentTime: Date;
//     setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//     currentTime: Date = new Date();
    
//     setTime(d: Date) {
//         this.currentTime = d;
//     }    
    
//     constructor(h: number, m: number) { }
// }

// 클래스의 스태틱과 인스턴스의 차이점
// 클래스는 두 가지 타입을 가진다 - 스태틱 타입과 인스턴스 타입

// interface ClockConstructor {
//     new (hour: number, minute: number): ClockInterface;
// }
// 클래스가 인터페이스를 implements 할 때, 클래스의 인스턴스만 검사하기 때문
// class Clock2 implements ClockConstructor {
//     constructor(h: number, m: number) { }
// }

// 대신, 클래스의 스태틱 부분을 직접적으로 다룰 필요가 있다.
// 생성자가 스태틱이기 때문에, 이 검사에 포함되지 않습니다.

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface; // 생성자가 반환해야 하는 타입을 지정한 것
}

interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { };

    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { };

    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// 익명 클래스 표현식 사용

// 1. 생성자 인터페이스 정의
// interface Clock2Constructor {
//     new (hour: number, minute: number);
// }

// interface Clock2Interface {
//     tick();
// }

// const Clock2: Clock2Constructor = class Clock2 implements Clock2Interface {
//     constructor(h: number, m: number) { };

//     tick() {
//         console.log("tick tock");
//     }
// }

// 인터페이스 확장하기 (Extending Interfaces)

// 클래스처럼, 인터페이스들도 확장(extend)이 가능
// 이는 한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해주는데, 
// 인터페이스를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = 'blue';
square.sideLength = 10;

interface PenStroke {
    penWidth: number;
}

interface Square2 extends Shape, PenStroke {
    sideLength: number;
}

let square2 = {} as Square2;
square2.color = 'blue';
square2.sideLength = 10;
square2.penWidth = 5.5;

// 하이브리드 타입 (Hybrid Types)
interface Counter {
    (start: number): string;
    interval?: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number) {} as Counter;
    counter.interval = 123;
    counter.reset = () => {};
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 클래스를 확장한 인터페이스 (Interfaces Extending Classes)

// 인터페이스는 클래스의 멤버들을 확장할 수 있음
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }  
}

class TextBox extends Control {
    select() { }
}

// class Image implements SelectableControl {
//     private state: any

//     select() { }
// }

class Location {

}