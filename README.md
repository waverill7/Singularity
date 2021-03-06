Singularity
===========

The language of no return (statement).

Overview:
    
    This is a dynamic and weakly typed language that draws influence from Python, C++, Java, and JavaScript.
    Furthermore, this language is intended to be clean, intuitive, and subtly reminiscent of the cosmos.

Logo:

![Logo](http://media.desura.com/images/mods/1/18/17505/Black_Hole.jpg)
    
Hello World:

    print "Hello, World!"

Declaration:

    global galaxy = "Milky Way"
    local color = "purple"
    global initialized = true
    local defined = false
    global pi = 3.14159
    local goldenRatio = 1.6180
    global hours = 24
    local rotations = 365
    global variable = 'x'
    local curve = 'S'
    global limit = void
    local return = void
    global box = [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]
    local point = [1, 1]
        
Assignment:
    
    =               Direct Assignment
    +=   −=	      Assignment by Sum and Difference
    *=   /=   %=	Assignment by Product, Quotient, and Remainder
    <<=  >>=	    Assignment by Bitwise Left Shift and Right Shift
    &=   ^=   |=	Assignment by Bitwise AND, XOR, and OR
   
        
Function:

    No Parameters/Void Always Returned:
        
        Signature:
        
            global f (void) = (void):
                ...
        
            local f (void) = (void):
                ...
        
        Call:
        
            global procedure = f()     $ executes f()
            print procedure            $ prints void
        
    Parameters/Void Always Returned:
    
        Signature:
            
            global f (x = 0) = (void):
                ...
                
            local f (x = 0) = (void):
                ...
        
        Call:
        
            global procedure = f(1)    $ executes f(1)
            print procedure            $ prints void
            
    No Parameters/Specified Value Returned:
    
        Signature:
          
            global f (void) = (y = 0):
                ...
                y = 2
                
            local f (void) = (y = 0):
                ...
                y = 2
                
        Call:
            
            global value = f()
        
    Parameters/Specified Value Returned:
    
        Signature:
            
            global f (x = 0) = (y = 0):
                ...
                y = x ** 2
                
            local f (x = 0) = (y = 0):
                ...
                y = x ** 2
                
        Call:
            
            global value = f(3)

Iteration:

    while x <= y:
        ...

    for i = x, i < y, i += 1:
        ...
        
Selection:

    if x < y and y < z:
        ...
    elif y > z:
        ...
    else:
        ...
            
Object:
    
    (Similar to Java/Python)
    
    Basic:
    
        global object Circle:
            $ A circle with a 2-D center point and a radius.

            global Circle(self, x = 0.0, y = 0.0, radius = 0.0) = (self):
                $ Constructor for a circle.

            global getArea(self) = (area = 3.14159 * (self.radius ** 2.0)):
                $ Returns the area of the circle.

            global getPerimeter(self) = (perimeter = 3.14159 * self.radius * 2.0):
                $ Returns the circumference of the circle.

            global expand(self, factor = 0.0) = (self):
                $ Increases the radius by the given factor and returns a copy of this object.
                self.radius *= factor

            global move(self, dx = 0.0, dy = 0.0) = (self):
                $ Moves the center point by <dx, dy> and returns a copy of this object.
                self.x += dx
                self.y += dy
            
            global toString(self) = (description = "Circle at " + self.x + ", " + self.y + " with r = " +  self.radius):
                $ Returns a stringy representation of the circle.
            
    Usage:
            
        global c1 = self.Circle(4.0, 3.0, 10.0)
        global c2 = c1
        print c2.getArea()
        print c2.getPerimeter()
        c2 = c2.move(3.0,2.0)
        print c2.toString()
        c2 = c2.move(-3.0,2.0)
        c2 = c2.expand(5.0)
        print c1.toString()
        print c2.toString()
    
    Inheritance:
    
        global object Animal:
            
            global Animal(self, name = "", sound = "") = (self):
                $ Constructor for an animal.

            global speak(self) = (void):
                print self.name + " says " + self.sound

        global object Cow(Animal):
            
            global Cow(self, name = "") = (self):
                self.Animal = self.Animal(name, "moo")

        global object Horse(Animal):
            
            global Horse(self, name = "") = (self):
                self.Animal = self.Animal(name, "neigh")

        global object Sheep(Animal):
            
            global Sheep(self, name = "") = (self):
                self.Animal = self.Animal(name, "baaaaa")

Matrix:
    
    global m = [void]       $ m = [void]        
    m[0] = 1                $ m = [1]
    m[1] = 2                $ m = [1, 2]
    m[2] = 3                $ m = [1, 2, 3]
    m[0] = m                $ m = [[1, 2, 3], 2, 3]
    m[0, 0] = 2             $ m = [[2, 2, 3], 2, 3]
    m[0, 1] = 4             $ m = [[2, 4, 3], 2, 3]
    m[0, 2] = 6             $ m = [[2, 4, 6], 2, 3]
    m[1] = [8, 10, 12]      $ m = [[2, 4, 6], [8, 10, 12], 3]
    m[2] = [14, 16, 18]     $ m = [[2, 4, 6], [8, 10, 12], [14, 16, 18]]
    m[1, 2] = 42            $ m = [[2, 4, 6], [8, 10, 42], [14, 16, 18]]
    
Keywords:
    
    global
    local
    print
    while
    for
    break
    continue
    if
    elif
    else
    object
    self
    void
    or
    and
    not
    true
    false
    
Operators:
    
    or                 logical or
    and                logical and
    |                  bitwise or
    ^                  bitwise xor
    &                  bitwise and
    == !=              equal to/not equal to
    < <= > >=          less than/less than or equal to/greater than/greater than or equal to
    << >>              bitwise left shift/bitwise right shift
    + -                addition/subtraction
    * / %              multiplication/division/modulo
    not ~ + -          logical not/bitwise not/unary plus/unary minus
    **                 power
    
Types:

    Singularity has 9 types:

    void               
    boolean            
    integer            
    real               
    character          
    string             
    object
    function
    matrix             
                       
Macrosyntax:
                       
    Program                  ::=    Block

    Block                    ::=    (Statement)+

    Statement                ::=    DeclarationStatement 
                              |     AssignmentStatement 
                              |     PrintStatement
                              |     ConditionalStatement 
                              |     WhileStatement 
                              |     ForStatement 
                              |     BreakStatement 
                              |     ContinueStatement 

    DeclarationStatement     ::=    ('global' | 'local') (VariableDeclaration | FunctionDeclaration | MethodDeclaration | ObjectDeclaration)

    VariableDeclaration      ::=    ID '=' Expression
    
    FunctionDeclaration      ::=    ID '(' ((VariableDeclaration (',' VariableDeclaration)*) | 'void') ')' '=' '(' (VariableDeclaration | 'void') ')' ':' 'Return' 'Indent' Block 'Dedent'
    
    MethodDeclaration        ::=    ID '(' 'self' (',' VariableDeclaration)* ')' '=' '(' (VariableDeclaration | 'void' | 'self') ')' ':' 'Return' 'Indent' Block 'Dedent'
    
    ObjectDeclaration        ::=    'object' ID ('(' ID (',' ID)* ')')? ':' 'Return' 'Indent' Block 'Dedent'
    
    AssignmentStatement      ::=    (Attribute | Call | Matrix | ID) ('=' | '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '^=' | '|=' | '<<=' | '>>=') Expression
                        
    Attribute                ::=    (ID | 'self') '.' (Call | Matrix | ID)

    Call                     ::=    ID '(' (Expression (',' Expression)*)? ')'

    Matrix                   ::=    ID '[' Expression (',' Expression)* ']'
    
    PrintStatement           ::=    'print' Expression
    
    ConditionalStatement     ::=    'if' Expression ':' 'Return' 'Indent' Block 'Dedent' ('elif' Expression ':' 'Return' 'Indent' Block 'Dedent')* ('else' ':' 'Return' 'Indent' Block 'Dedent')?
    
    WhileStatement           ::=    'while' Expression ':' 'Return' 'Indent' Block 'Dedent'
    
    ForStatement             ::=    'for' VariableDeclaration ',' Expression ',' Assignment ':' 'Return' 'Indent' Block 'Dedent'
    
    BreakStatement           ::=    'break'
    
    ContinueStatement        ::=    'continue'

    Expression               ::=    Expression_1 ('or' Expression_1)*

    Expression_1             ::=    Expression_2 ('and' Expression_2)*

    Expression_2             ::=    Expression_3 ('|' Expression_3)*

    Expression_3             ::=    Expression_4 ('^' Expression_4)*
    
    Expression_4             ::=    Expression_5 ('&' Expression_5)*
    
    Expression_5             ::=    Expression_6 (('==' | '!=') Expression_6)?

    Expression_6             ::=    Expression_7 (('<' | '<=' | '>' | '>=') Expression_7)? 
    
    Expression_7             ::=    Expression_8 (('<<' | '>>') Expression_8)*
    
    Expression_8             ::=    Expression_9 (('+' | '-') Expression_9)* 
    
    Expression_9             ::=    Expression_10 (('*' | '/' | '%') Expression_10)*
    
    Expression_10            ::=    ('not' | '~' | '+' | '-')? Expression_11

    Expression_11            ::=    Expression_12 ('**' Expression_12)*

    Expression_12            ::=    Attribute
                              |     Call 
                              |     Matrix
                              |     ID
                              |     '(' Expression ')'
                              |     Literal

    Literal                  ::=    VoidLiteral
                              |     BooleanLiteral
                              |     IntegerLiteral 
                              |     RealLiteral
                              |     CharacterLiteral
                              |     StringLiteral
                              |     MatrixLiteral
    
    VoidLiteral              ::=    'void'
    
    BooleanLiteral           ::=    ('true' | 'false')
                     
    MatrixLiteral            ::=    '[' Expression (',' Expression)* ']'
                
Microsyntax:

    (TO DO)

