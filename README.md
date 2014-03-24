Singularity
===========

The language of no return.

Overview:
    
    This is a static and strongly typed systems programming language that draws influence from Python, Java, and MATLAB.
    Furthermore, this language is intended to be clean, intuitive, and subtly reminiscent of the cosmos.

Logo:

![Logo](http://media.desura.com/images/mods/1/18/17505/Black_Hole.jpg)
    
Hello World:

    print "Hello, World!"

Declaration:

    global galaxy = "Milky Way"
    local color = "purple"
    global limit = void
    local return = void
    global initialized = true
    local defined = false
    global pi = 3.14159 {float}
    local rotations = 365 {int}
    global variable = 'x'
    local curve = 'S'
    global  box = 8 # 3
    local point = 1 # 2
    global galaxy = "Milky Way", limit = void, initialized = true, pi = 3.14159 {float}, variable = 'x', box = 8 # 3
    local color = "purple", return = void, defined = false, rotations = 365 {int}, curve = 'S', point = 1 # 2

Assignment:
 
    global galaxy = ""
    @ galaxy = "Milky Way"
    
    local color = ""
    @ color = "purple"
    
    global limit = void
    (no other value possible)
    
    local return = void
    (no other value possible)
    
    global initialized = false
    @ initialized = true
    
    local defined = true
    @ defined = false
    
    global pi = 0.0 {float}
    @ pi = 3.14159
    
    local rotations = 0 {int}
    @ rotations = 365
    
    global variable = ''
    @ variable = 'x'
    
    local curve = ''
    @ curve = 'S'
    
    global  box = 8 # 3
    @ box[] = [[0 0 0] [0 0 1] [0 1 0] [0 1 1] [1 0 0] [1 0 1] [1 1 0] [1 1 1]]
    
    local point = 1 # 2
    @ point[] = [[1 1]]
    
Number:
    
    Number declarations must include one of the following proceeding the specified value:
    
    Natural:
        
        {u_byte}/{u_short}/{u_int}/{u_long}
    
    Integer:
        
        {byte}/{short}/{int}/{long}
        
    Real:
        
        {float}/{double}
        
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
    
        object Circle:
            $ A circle with a 2-D center point and a radius.
            local x = 0
            local y = 0
            local radius = 0

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
            
    Usage:
            
        global c = self.Circle(4, 3, 10)
        print c.getArea()
        print c.getPerimeter()
        print c.move(3, 2).toString()
        print c.toString()
        print c.move(-3,2).expand(5).toString()
        print c.toString()
    
    Inheritance:
    
        object Animal:
            local name = ""
            local sound = ""
            
            global Animal(self, name, sound) = self:
                @ self.name = name
                @ self.sound = sound

            global speak(self) = void:
                print self.name + " says " + self.sound

        object Cow(Animal):
            
            global Cow(self, name) = self:
                @ self.Animal = self.Animal(name, "moo")

        object Horse(Animal):
            
            global Horse(self, name) = self:
                @ self.Animal = self.Animal(name, "neigh")

        object Sheep(Animal):
            
            global Sheep(self, name) = self:
                @ self.Animal = self.Animal(name, "baaaaa")

Matrix:
    
    global m = 4 # 2      matrix with 4 rows and 2 columns with every entry initialized to void
    @ m[3][1] = 12        row 3, column 1 entry assigned the value 12
    @ m[0] = [2 4]        row 0, column 0 assigned the value 2 and row 0, column 1 assigned the value 4
    @ m[] = [                
          [2 4]           row 0, column 0 assigned the value 2 and row 0, column 1 assigned the value 4
          [6 8]           row 1, column 0 assigned the value 6 and row 1, column 1 assigned the value 8
          [10 12]         row 2, column 0 assigned the value 10 and row 2, column 1 assigned the value 12
          [14 16]         row 3, column 0 assigned the value 14 and row 3, column 1 assigned the value 16
        ]
    print m[]             prints the entire matrix
    print m[1]            prints the first row ([6 8])
    print m[2][1]         prints 12
    
Keywords:
    
    global
    local
    @
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
    u_byte
    u_short
    u_int
    u_long
    byte
    short
    int
    long
    float
    double
    or
    and
    not
    true
    false
    
Operators:
    
    ++ --              increment/decrement              
    or                 logical or
    and                logical and
    not                logical not
    < <= > >= != ==    less than/less than or equal to/greater than/greater than or equal to/not equal to/equal to
    |                  bitwise or
    ^                  bitwise xor
    &                  bitwise and
    << >>              shift left/shift right
    + -                addition/subtraction
    * / %              multiplication/division/modulo
    -                  negation
    ~                  unary complement
    **                 power
    
Types:

    Singularity has 9 types:

    void               void
    boolean            true/false
    integer            u_byte/u_short/u_int/u_long/byte/short/int/long
    real               float/double
    string             ""
    char               ''
    matrix             r # c
    object             
    function
                       
Macrosyntax:
                       
    Program             ::=    Block

    Block               ::=    (Statement)+

    Statement           ::=    Scope
                         |     Assignment
                         |     Attribute
                         |     Call
                         |     Matrix
                         |     Print
                         |     While
                         |     For
                         |     Break
                         |     Continue
                         |     If
                         |     Object
                        
    Scope               ::=    ('global' | 'local') ID (Declaration | Signature)

    Declaration         ::=    '=' Expression (Size | ('#' Expression))? (',' ID '=' Expression (Size | ('#' Expression))?)*

    Size                ::=    '{' ('u_byte' | 'u_short' | 'u_int' | 'u_long') '}'
                         |     '{' ('byte' | 'short' | 'int' | 'long') '}'
                         |     '{' ('float' | 'double') '}'
                        
    Signature           ::=    Function 
                         |     Method
    
    Function            ::=    '(' ((ID (',' ID)*) | 'void') ')' '=' (ID | 'void') ':' 'Return' 'Indent' Block 'Dedent'
    
    Method              ::=    '(' 'self' (',' ID)* ')' '=' (ID | 'void' | 'self') ':' 'Return' 'Indent' Block 'Dedent'

    Assignment          ::=    (ID | ('self' '.' ID)) (('=' Expression) | ('++' | '--'))
                         |     ID '[' ']' '=' '[' ('[' Expression (' ' Expression)* ']')+ ']'
                         |     ID '[' Expression ']' '=' '[' Expression (' ' Expression)* ']'
                         |     ID '[' Expression ']' '[' Expression ']' '=' Expression
                        
    Attribute           ::=    'self' '.' ID
                         |     'self' '.' Call
                         |     ID ('.' Call)+

    Call                ::=    ID Arguments 

    Arguments           ::=    '(' (Expression (',' Expression)*)? ')'

    Matrix              ::=    ID (('[' ']') | ('[' Expression ']' ('[' Expression ']')?))
    
    Print               ::=    'print' Expression
    
    While               ::=    'while' Expression ':' 'Return' 'Indent' Block 'Dedent'
    
    For                 ::=    'for' Assignment ',' Expression ',' Assignment ':' 'Return' 'Indent' Block 'Dedent'
    
    Break               ::=    'break'
    
    Continue            ::=    'continue'
                                    
    If                  ::=    'if' Expression ':' 'Return' 'Indent' Block 'Dedent' ('elif' Expression ':' 'Return' 'Indent' Block 'Dedent')* ('else' ':' 'Return' 'Indent' Block 'Dedent')?
    
    Object              ::=    'object' ID ('(' ID (',' ID)* ')')? ':' 'Return' 'Indent' Block 'Dedent'

    Expression          ::=    Expression_1 ('or' Expression_1)*

    Expression_1        ::=    Expression_2 ('and' Expression_2)*

    Expression_2        ::=    'not'? Expression_3

    Expression_3        ::=    Expression_4 (('<' | '<=' | '>' | '>=' | '!=' | '==') Expression_4)?

    Expression_4        ::=    Expression_5 ('|' Expression_5)*

    Expression_5        ::=    Expression_6 ('^' Expression_6)*

    Expression_6        ::=    Expression_7 ('&' Expression_7)*

    Expression_7        ::=    Expression_8 (('<<' | '>>') Expression_8)*

    Expression_8        ::=    Expression_9 (('+' | '-') Expression_9)*

    Expression_9        ::=    Expression_10 (('*' | '/' | '%') Expression_10)*

    Expression_10       ::=    '-'? Expression_11

    Expression_11       ::=    '~'? Expression_12

    Expression_12       ::=    Expression_13 ('**' Expression_13)*

    Expression_13       ::=    Literal
                         |     ID
                         |     Attribute
                         |     Call 
                         |     Matrix
                         |     '(' Expression ')'

    Literal             ::=    'void'
                         |     ('true' | 'false')
                         |     (IntegerLiteral | RealLiteral)
                         |     StringLiteral
                         |     CharacterLiteral
                
Microsyntax:

    (TO DO)
