Number.prototype.log = function (){console.log(+this)};
Function.prototype.log = function(){ console.log(this.toString())};


const I = a => a;
I(3).log();


const SELF = f => f(f)

const PRI = a => b => a ;
PRI(7)(11).log();


const ULT = a => b => b;
ULT(2)(42).log();


const TROC = f => a => b => f(b)(a)

TROC(ULT)(11)(42).log()


const T = PRI
const F = ULT

T.log()
F.log()

T.toString = () => 'Verdadeiro (PRI)'
F.toString = () => 'Falso (ULT)'

//NOT
const NOT = a => a(F)(T)
NOT(F).log()
 

//AND

const AND = a => b => a(b)(F);
AND(T)(T).log();



// OR

const OR = a => b => a(T)(b)

OR(T)(F).log();


const EQ = a => b => a(AND(a)(b))(NOT(OR(a)(b)))

EQ(F)(T).log()


const XOR = a => b => NOT(EQ(a)(b))

XOR(T)(F).log()


function l (){
    console.log(this);
}

l()


