Singularity
===========

The language of no return (statement).

Overview:
    
    This is a dynamic and weakly typed language that draws influence from Python, C++, and JavaScript.
    Furthermore, this language is intended to be clean, intuitive, and subtly reminiscent of the cosmos.

Logo:

![Logo](http://media.desura.com/images/mods/1/18/17505/Black_Hole.jpg)
    
Hello World:

    print "Hello, World!"

Declaration:

    global @ galaxy = "Milky Way"
    local @ color = "purple"
    global @ initialized = true
    local @ defined = false
    global @ pi = 3.14159
    local @ goldenRatio = 1.6180
    global @ hours = 24
    local @ rotations = 365
    global @ variable = 'x'
    local @ curve = 'S'
    global @ limit = void
    local @ return = void
    global @ box = [void]
    local @ point = [void]

Assignment: (update)
 
    @ galaxy = "Milky Way"
    
    @ color = "purple"
    
    global initialized = false
    @ initialized = true
    
    local defined = true
    @ defined = false
    
    global limit = void
    
    global pi = 0.0 {float}
    @ pi = 3.14159
    
    local rotations = 0 {int}
    @ rotations = 365
    
    global variable = ''
    @ variable = 'x'
    
    local curve = ''
    @ curve = 'S'
    
    @ box[] = [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]
    
    @ point[] = [[1, 1]]
        
Function:

    No Parameters/No Value Returned:
        
        Signature:
        
            global f (void) = void:
                ...
        
            local f (void) = void:
                ...
        
        Call:
        
            f()
        
    Parameters/No Value Returned:
    
        Signature:
            
            global f (x) = void:
                ...
                
            local f (x) = void:
                ...
        
        Call:
        
            f(1)
            
    No Parameters/Value Returned:
    
        Signature:
          
            global f (void) = y:
                ...
                @ y = 2
                
            local f (void) = y:
                ...
                @ y = 2
                
        Call:
            
            global z = 0 {int}
            @ z = f()
        
    Parameters/Value Returned:
    
        Signature:
            
            global f (x) = y:
                ...
                @ y = 2
                
            local f (x) = y:
                ...
                @ y = 2
                
        Call:
            
            global z = 0 {int} 
            @ z = f(1)

Iteration:

    while x == y:
        ...

    for @ i = x, i < y, @ i++:
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
            local @ x = 0
            local @ y = 0
            local @ radius = 0

            global Circle(self, x, y, radius) = self:
                $ Constructor for a circle.
                @ self.x = x
                @ self.y = y
                @ self.radius = radius

            global getArea(self) = area:
                $ Returns the area of the circle.
                @ area = 3.14159 * (self.radius ** 2)

            global getPerimeter(self) = perimeter:
                $ Returns the circumference of the circle.
                @ perimeter = 3.14159 * self.radius * 2

            global expand(self, factor) = self:
                $ Increases the radius by the given factor.
                @ self.radius = self.radius * factor

            global move(self, dx, dy) = self:
                $ Moves the center point by <dx, dy>.
                @ self.x = self.x + dx
                @ self.y = self.y + dy
            
            global toString(self) = description:
                $ Returns a stringy representation of the circle.
                @ description = "Circle at " + self.x + ", " + self.y + " with r = " +  self.radius
            
    Usage: (update)
            
        global @ c1 = self.Circle(4, 3, 10)
        global @ c2 = c1
        print c2.getArea()
        print c2.getPerimeter()
        @ c2 = c2.move(3,2)
        print c2.toString()
        @ c2 = c2.move(-3,2)
        @ c2 = c2.expand(5)
        print c1.toString()
        print c2.toString()
    
    Inheritance:
    
        global object Animal:
            local @ name = ""
            local @ sound = ""
            
            global Animal(self, name, sound) = self:
                @ self.name = name
                @ self.sound = sound

            global speak(self) = void:
                print self.name + " says " + self.sound

        global object Cow(Animal):
            
            global Cow(self, name) = self:
                @ self.Animal = self.Animal(name, "moo")

        global object Horse(Animal):
            
            global Horse(self, name) = self:
                @ self.Animal = self.Animal(name, "neigh")

        global object Sheep(Animal):
            
            global Sheep(self, name) = self:
                @ self.Animal = self.Animal(name, "baaaaa")

Matrix:
    
    global @ m = [void]       m = [void]        
    @ m[0] = 1                m = [1]
    @ m[1] = 2                m = [1, 2]
    @ m[2] = 3                m = [1, 2, 3]
    @ m[0] = m                m = [[1, 2, 3]]
    @ m[0, 0] = 2             m = [[2, 2, 3]]
    @ m[0, 1] = 4             m = [[2, 4, 3]]
    @ m[0, 2] = 6             m = [[2, 4, 6]]
    @ m[1] = [8, 10, 12]      m = [[2, 4, 6], [8, 10, 12]]
    @ m[2] = [14, 16, 18]     m = [[2, 4, 6], [8, 10, 12], [14, 16, 18]]
    @ m[1, 2] = 42            m = [[2, 4, 6], [8, 10, 42], [14, 16, 18]]
    
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
    ++ --              postfix increment/postfix decrement
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
                       
    Program           ::=    Block

    Block             ::=    (Statement)+

    Statement         ::=    Declaration 
                       |     Assignment 
                       |     Function
                       |     Method
                       |     Object
                       |     Attribute 
                       |     Call 
                       |     Matrix 
                       |     Print
                       |     Conditional 
                       |     While 
                       |     For 
                       |     Break 
                       |     Continue 

    Declaration       ::=    ('global' | 'local') (Assignment | Function | Method | Object)

    Assignment        ::=    '@' (Attribute | Call | Matrix | ID) '=' Expression
    
    Function          ::=    ID '(' ((ID (',' ID)*) | 'void') ')' '=' (ID | 'void') ':' 'Return' 'Indent' Block 'Dedent'
    
    Method            ::=    ID '(' 'self' (',' ID)* ')' '=' (ID | 'void' | 'self') ':' 'Return' 'Indent' Block 'Dedent'
    
    Object            ::=    'object' ID ('(' ID (',' ID)* ')')? ':' 'Return' 'Indent' Block 'Dedent'
                        
    Attribute         ::=    (ID | 'self') '.' (Call | Matrix | ID)

    Call              ::=    ID '(' (Expression (',' Expression)*)? ')'

    Matrix            ::=    ID '[' Expression (',' Expression)* ']'
    
    Print             ::=    'print' Expression
    
    Conditional       ::=    'if' Expression ':' 'Return' 'Indent' Block 'Dedent' ('elif' Expression ':' 'Return' 'Indent' Block 'Dedent')* ('else' ':' 'Return' 'Indent' Block 'Dedent')?
    
    While             ::=    'while' Expression ':' 'Return' 'Indent' Block 'Dedent'
    
    For               ::=    'for' Assignment ',' Expression ',' Assignment ':' 'Return' 'Indent' Block 'Dedent'
    
    Break             ::=    'break'
    
    Continue          ::=    'continue'

    Expression        ::=    Expression_1 ('or' Expression_1)*

    Expression_1      ::=    Expression_2 ('and' Expression_2)*

    Expression_2      ::=    Expression_3 ('|' Expression_3)*

    Expression_3      ::=    Expression_4 ('^' Expression_4)*
    
    Expression_4      ::=    Expression_5 ('&' Expression_5)*
    
    Expression_5      ::=    Expression_6 (('==' | '!=') Expression_6)?

    Expression_6      ::=    Expression_7 (('<' | '<=' | '>' | '>=') Expression_7)? 
    
    Expression_7      ::=    Expression_8 (('<<' | '>>') Expression_8)*
    
    Expression_8      ::=    Expression_9 (('+' | '-') Expression_9)* 
    
    Expression_9      ::=    Expression_10 (('*' | '/' | '%') Expression_10)*
    
    Expression_10     ::=    ('not' | '~' | '+' | '-')? Expression_11

    Expression_11     ::=    Expression_12 ('++' | '--')?     

    Expression_12     ::=    Expression_13 ('**' Expression_13)*

    Expression_13     ::=    Attribute
                       |     Call 
                       |     Matrix
                       |     ID
                       |     '(' Expression ')'
                       |     Literal

    Literal           ::=    VoidLiteral
                       |     BooleanLiteral
                       |     IntegerLiteral 
                       |     RealLiteral
                       |     CharacterLiteral
                       |     StringLiteral
                       |     MatrixLiteral
    
    VoidLiteral       ::=    'void'
    
    BooleanLiteral    ::=    ('true' | 'false')
                     
    MatrixLiteral     ::=    '[' Expression (',' Expression)* ']'
                
Microsyntax:

    (TO DO)
