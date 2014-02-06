Singularity
===========

The language of no return.

LOGO:

    ![alt tag](http://media.desura.com/images/mods/1/18/17505/Black_Hole.jpg)
    
HELLO WORLD:

    print "Hello, World!"

DECLARATION:

    global galaxy = "Milky Way"
    local color = "purple"
    global limit = void
    local return = void
    global initialized = true
    local defined = false
    global pi = 3.14159 (float)
    local rotations = 365 (int)
    global variable = 'x'
    local curve = 'S'
    global  box = 8 # 3
    local point = 1 # 2
    global galaxy = "Milky Way", limit = void, initialized = true, pi = 3.14159 (float), variable = 'x', box = 8 # 3
    local color = "purple", return = void, defined = false, rotations = 365 (int), curve = 'S', point = 1 # 2

ASSIGNMENT:
 
    global galaxy = ""
    galaxy = "Milky Way"
    
    local color = ""
    color = "purple"
    
    global limit = void
    (no other value possible)
    
    local return = void
    (no other value possible)
    
    global initialized = false
    initialized = true
    
    local defined = true
    defined = false
    
    global pi = 0.0 (float)
    pi = 3.14159
    
    local rotations = 0 (int)
    rotations = 365
    
    global variable = ''
    variable = 'x'
    
    local curve = ''
    curve = 'S'
    
    global  box = 8 # 3
    box = [[0 0 0] [0 0 1] [0 1 0] [0 1 1] [1 0 0] [1 0 1] [1 1 0] [1 1 1]]
    
    local point = 1 # 2
    point = [[1 1]]
    
NUMBER:
    
    Number declarations must include one of the following proceeding the specified value:
    
    Natural:
        
        (u_byte)/(u_short)/(u_int)/(u_long)
    
    Integer:
        
        (byte)/(short)/(int)/(long)
        
    Real:
        
        (float)/(double)
        
FUNCTION:

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
                y = 2
                
            local f (void) = y:
                ...
                y = 2
                
        Call:
            
            global z = 0 (int)
            z = f()
        
    Parameters/Value Returned:
    
        Signature:
            
            global f (x) = y:
                ...
                y = 2
                
            local f (x) = y:
                ...
                y = 2
                
        Call:
            
            global z = 0 (int) 
            z = f(1)

ITERATION:

    while x == y:
        ...

    for i = x, i < y, i++:
        ...
        
SELECTION:

    if x < y and y < z:
        ...
    elif y > z:
        ...
    else:
        ...
    
    switch x:
        case 1:
            ...
        case 2:
            ...
            continue   (Switch Cases Break By Default!)
        default:
            ...
            
OBJECT:
    
    (Much Like Python)
    
    Basic:
    
        object Circle:
            {A circle with a 2-D center point and a radius.}

        matter __init__(pole, x, y, radius) = void:
            pole.x = x
            pole.y = y
            pole.radius = radius

        matter getArea(pole) = area:
            {Returns the area of the circle}
            area = 3.14159 * (pole.radius ** 2)

        matter getPerimeter(pole) = perimeter:
            {Returns the circumference of the circle}
            perimeter = 3.14159 * pole.radius * 2

        matter expand(pole, factor) = pole:
            {Increases the radius by the given factor}
            pole.radius *= factor

        matter move(pole, dx, dy) = pole:
            {Moves the center point by <dx, dy>}
            pole.x += dx
            pole.y += dy
            
        matter __str__(pole) = description:
            description = "Circle at (%g,%g) with r=%g" % (pole.x, pole.y, pole.radius)
            
    Usage:
            
        c = Circle(4, 3, 10)
        c.getArea()
        c.getPerimeter()
        c.move(3, 2)
        print c
        c.move(-3,2).expand(5)
        print c
    
    Inheritance:
    
        object Animal:
            matter __init__(pole, name) = void:
                pole.name = name

            matter speak(pole) = void:
                print pole.name, "says", pole.sound()

        object Cow(Animal):
            matter __init__(pole, name) = void:
                Animal.__init__(pole, name)

            matter sound(pole) = s:
                s = "moo"

        object Horse(Animal):
            matter __init__(pole, name) = void:
                Animal.__init__(pole, name)

            matter sound(pole) = s:
                s = "neigh"

        object Sheep(Animal):
            matter __init__(pole, name) = void:
                Animal.__init__(pole, name)

            matter sound(pole) = s:
                s = "baaaaa"

MATRIX:
    
    global m = 4 # 2     matrix with 4 rows and 2 columns with every entry initialized to void
    m[3][1] = 12         row 3, column 1 entry assigned the value 12
    x[0] = [2 4]         row 0, column 0 assigned the value 2 and row 0, column 1 assigned the value 4
    x = [                
         [2 4]           row 0, column 0 assigned the value 2 and row 0, column 1 assigned the value 4
         [6 8]           row 1, column 0 assigned the value 6 and row 1, column 1 assigned the value 8
         [10 12]         row 2, column 0 assigned the value 10 and row 2, column 1 assigned the value 12
         [14 16]         row 3, column 0 assigned the value 14 and row 3, column 1 assigned the value 16
        ]
    x                    returns the entire matrix
    x[1]                 returns the first row ([6 8])
    x[2][1]              returns 12
    
KEYWORDS:
    
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
    switch
    case
    default
    object
    matter
    pole
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
    
OPERATORS:
    
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
    #                  matrix size (n # n)
    
TYPES:

    Singularity has 10 types:

    void               void
    boolean            true/false
    natural            u_byte/u_short/u_int/u_long
    integer            byte/short/int/long
    real               float/double
    string             ""
    char               ''
    matrix             n # n
    object             
    function
                       
MACROSYNTAX:
                       
    Program            ::=    Block
                              
    Block              ::=    (Statement)+
                              
    Statement          ::=    ('global' | 'local') (Declaration | Signature)
                        |     Assignment
                        |     Call
                        |     'print' Arguments
                        |     'while' Expression ':' Block
                        |     'for' Assignment ',' Expression ',' Assignment ':' Block
                        |     'break'
                        |     'continue'
                        |     'if' Expression ':' Block ('elif' Expression ':' Block)* ('else' ':' Block)?
                        |     'switch' ID ':' ('case' Expression ':' Block 'continue'?)* ('default' ':' Block)? 
                        |     'object' ID ('(' ID ')')? ':' Block
                        |     'matter' ID '(' 'pole' (',' ID)* ')' '=' ((ID ':' Block Assignment) | (('void' | 'pole') ':' Block)))
                        |     Attribute
                              
    Declaration        ::=    ID '=' Expression Type? (',' ID '=' Expression Type?)*
                              
    Type               ::=    '(' ('u_byte' | 'u_short' | 'u_int' | 'u_long' ')'
                        |     '(' ('byte' | 'short' | 'int' | 'long' ')'
                        |     '(' ('float' | 'double') ')'
                              
    Assignment         ::=    (ID | ('pole' '.' ID)) '=' (Expression | ('++' | '--'))
                        |     ID '=' '[' ('[' Expression (' ' Expression)* ']')+ ']'
                        |     ID '[' Expression ']' '=' '[' Expression (' ' Expression)* ']'
                        |     ID '[' Expression ']' '[' Expression ']' '=' Expression
                   
    Signature          ::=    ID Parameters '=' ((ID ':' Block Assignment) | ('void' ':' Block))
                           
    Parameters         ::=    '(' ((ID (',' ID)*) | 'void') ')' 
                           
    Call               ::=    ID Arguments 
                          
    Arguments          ::=    '(' (Expression (',' Expression)*)? ')'
                          
    Attribute          ::=    'pole' '.' ID
                        |     ID ('.' ID '(' 'pole' (',' Expression)* ')')+
                        |     ID ('.' ID Arguments)+
                          
    Matrix             ::=    ID ('[' Expression ']' ('[' Expression ']')?)? 
                        |     Expression '#' Expression    
                          
    Expression         ::=    Expression_1 ('or' Expression_1)*
                          
    Expression_1       ::=    Expression_2 ('and' Expression_2)*

    Expression_2       ::=    'not'? Expression_3

    Expression_3       ::=    Expression_4 (('<' | '<=' | '>' | '>=' | '!=' | '==') Expression_4)?

    Expression_4       ::=    Expression_5 ('|' Expression_5)*

    Expression_5       ::=    Expression_6 ('^' Expression_6)*
                            
    Expression_6       ::=    Expression_7 ('&' Expression_7)*
                           
    Expression_7       ::=    Expression_8 (('<<' | '>>') Expression_8)*
                          
    Expression_8       ::=    Expression_9 (('+' | '-') Expression_9)*
                          
    Expression_9       ::=    Expression_10 (('*' | '/' | '%') Expression_10)*
                          
    Expression_10      ::=    '-'? Expression_11
                          
    Expression_11      ::=    '~'? Expression_12
                          
    Expression_12      ::=    Expression_13 ('**' Expression_13)*
                          
    Expression_13      ::=    Literal
                        |     ID
                        |     Call
                        |     Attribute 
                        |     Matrix
                        |     '(' Expression ')'
                           
    Literal            ::=    'void'
                        |     ('true' | 'false')
                        |     (NaturalLiteral | IntegerLiteral | RealLiteral)
                        |     StringLiteral
                        |     CharacterLiteral
                
MICROSYNTAX:

    (TO DO)
