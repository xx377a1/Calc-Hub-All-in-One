import { CalculatorMeta } from '../types';

export const CALCULATORS: CalculatorMeta[] = [
  // Everyday Calculators
  {
    id: 'basic-calculator',
    slug: 'basic-calculator',
    name: 'Basic Calculator',
    category: 'everyday',
    description: 'A standard full-featured calculator for addition, subtraction, multiplication, division, and basic arithmetic.',
    iconName: 'Calculator',
    popular: true,
    featured: true,
    tags: ['math', 'arithmetic', 'addition', 'subtraction', 'multiplication', 'division', 'standard'],
    formula: 'Result = Expression evaluation',
    example: {
      input: '25 × 4 + 10',
      output: '110',
      explanation: 'Multiplication takes precedence (25 × 4 = 100), then addition (+ 10 = 110).'
    },
    faq: [
      { question: 'Can I use my keyboard?', answer: 'Yes! Type numbers, +, -, *, /, Enter for calculate, and Backspace/Escape to clear.' },
      { question: 'Does it handle negative numbers?', answer: 'Yes, click the +/- button to invert positive or negative values.' }
    ]
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'everyday',
    description: 'Calculate what X% of Y is, find percentage increase/decrease, or determine what percent X is of Y.',
    iconName: 'Percent',
    popular: true,
    featured: true,
    tags: ['percentage', 'percent', 'portion', 'increase', 'decrease', 'ratio'],
    formula: 'X% of Y = (X / 100) × Y',
    example: {
      input: '15% of $200',
      output: '$30.00',
      explanation: '(15 / 100) × 200 = 30.'
    },
    faq: [
      { question: 'How do I calculate percentage increase?', answer: 'Select the Percentage Increase mode, enter your original value and final value to get the percentage change.' },
      { question: 'How is percentage decrease computed?', answer: 'It calculates ((Original - Final) / Original) × 100.' }
    ]
  },
  {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'everyday',
    description: 'Find out final sale price and total money saved given an original price, discount percentage, and tax.',
    iconName: 'Tag',
    popular: true,
    featured: true,
    tags: ['shopping', 'discount', 'sale', 'savings', 'tax', 'price'],
    formula: 'Final Price = Original Price × (1 - Discount%) × (1 + Tax%)',
    example: {
      input: 'Original: $100, Discount: 20%, Tax: 5%',
      output: 'Final Price: $84.00, Saved: $20.00',
      explanation: 'Discounted price is $80. Adding 5% sales tax ($4) gives $84 total.'
    },
    faq: [
      { question: 'Can I add sales tax?', answer: 'Yes, enter your local sales tax percentage to calculate the total final checkout price.' }
    ]
  },
  {
    id: 'tip-calculator',
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'everyday',
    description: 'Calculate restaurant tips quickly and split total bills evenly among any number of people.',
    iconName: 'Utensils',
    popular: true,
    tags: ['tip', 'gratuity', 'restaurant', 'bill split', 'dining'],
    formula: 'Tip Amount = Bill × (Tip% / 100); Total Per Person = (Bill + Tip) / People',
    example: {
      input: 'Bill: $80, Tip: 18%, 4 People',
      output: 'Tip: $14.40, Total: $94.40, Per Person: $23.60',
      explanation: '$80 × 18% = $14.40 tip. $94.40 divided by 4 people is $23.60 each.'
    },
    faq: [
      { question: 'What is a standard tip percentage?', answer: 'In the US, 15% to 20% is typical for restaurant table service.' }
    ]
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'everyday',
    description: 'Calculate exact age in years, months, days, hours, and minutes, plus a countdown to the next birthday.',
    iconName: 'User',
    popular: true,
    featured: true,
    tags: ['age', 'birthday', 'date of birth', 'dob', 'years', 'days'],
    formula: 'Exact difference between Birth Date and Target Date',
    example: {
      input: 'Date of Birth: Jan 15, 1995',
      output: '31 Years, 7 Months, 2 Days',
      explanation: 'Exact age calculated taking leap years into account.'
    },
    faq: [
      { question: 'Does it account for leap years?', answer: 'Yes, full calendar precision including leap years is built in.' }
    ]
  },
  {
    id: 'date-calculator',
    slug: 'date-calculator',
    name: 'Date Calculator',
    category: 'everyday',
    description: 'Add or subtract days, weeks, months, or years from any starting date.',
    iconName: 'CalendarPlus',
    tags: ['date', 'calendar', 'add days', 'subtract days', 'future date'],
    formula: 'Target Date = Start Date ± (Days / Months / Years)',
    example: {
      input: 'Start: Aug 1, 2026 + 45 days',
      output: 'September 15, 2026',
      explanation: 'Adds 45 calendar days to the initial date.'
    }
  },
  {
    id: 'time-calculator',
    slug: 'time-calculator',
    name: 'Time Calculator',
    category: 'everyday',
    description: 'Add, subtract, and calculate total duration between hours, minutes, and seconds.',
    iconName: 'Clock',
    tags: ['time', 'hours', 'minutes', 'duration', 'clock'],
    formula: 'Total Seconds = ∑ (Hours × 3600 + Minutes × 60 + Seconds)',
    example: {
      input: '2h 45m + 3h 30m',
      output: '6 Hours 15 Minutes',
      explanation: '2h 45m plus 3h 30m equals 5h 75m, which simplifies to 6h 15m.'
    }
  },
  {
    id: 'average-calculator',
    slug: 'average-calculator',
    name: 'Average Calculator',
    category: 'everyday',
    description: 'Find the mean, median, mode, range, minimum, maximum, and sum of a set of numbers.',
    iconName: 'Sliders',
    tags: ['average', 'mean', 'median', 'mode', 'stats', 'range'],
    formula: 'Mean = Sum of values / Total count',
    example: {
      input: '10, 20, 30, 40, 50',
      output: 'Mean: 30, Median: 30, Sum: 150',
      explanation: '150 / 5 = 30.'
    }
  },
  {
    id: 'ratio-calculator',
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    category: 'everyday',
    description: 'Solve proportions A:B = C:D, simplify ratios, or scale dimensions proportionally.',
    iconName: 'Maximize2',
    tags: ['ratio', 'proportion', 'scale', 'aspect ratio', 'fraction'],
    formula: 'A / B = C / D => A × D = B × C',
    example: {
      input: '16 : 9 = 1920 : X',
      output: 'X = 1080',
      explanation: 'Standard 1080p aspect ratio scaling.'
    }
  },
  {
    id: 'fraction-calculator',
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    category: 'everyday',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step simplification and decimal output.',
    iconName: 'PieChart',
    tags: ['fraction', 'numerator', 'denominator', 'simplify', 'mixed number'],
    formula: 'a/b ± c/d = (ad ± bc) / bd',
    example: {
      input: '1/2 + 1/4',
      output: '3/4 (0.75)',
      explanation: '2/4 + 1/4 = 3/4.'
    }
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'everyday',
    description: 'Generate customizable lists of random integer numbers within any min and max range.',
    iconName: 'Shuffle',
    tags: ['random', 'rng', 'dice', 'lottery', 'probability', 'pick'],
    formula: 'Floor(Random() × (Max - Min + 1)) + Min',
    example: {
      input: 'Min: 1, Max: 100, Count: 3',
      output: '42, 17, 89',
      explanation: 'Three cryptographically random uniform integers.'
    }
  },
  {
    id: 'number-converter',
    slug: 'number-converter',
    name: 'Number Converter',
    category: 'everyday',
    description: 'Convert between Binary, Octal, Decimal, Hexadecimal, and Roman Numeral formats instantly.',
    iconName: 'Code',
    tags: ['binary', 'hexadecimal', 'octal', 'roman numerals', 'base conversion'],
    formula: 'Base N conversion routines',
    example: {
      input: 'Decimal 255',
      output: 'Hex: FF, Binary: 11111111, Roman: CCLV',
      explanation: '255 represented across standard base systems.'
    }
  },

  // Math Calculators
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    description: 'Advanced calculator supporting trigonometric, logarithmic, exponential, root, and factorial functions.',
    iconName: 'Binary',
    popular: true,
    featured: true,
    tags: ['scientific', 'sin', 'cos', 'tan', 'log', 'ln', 'exponent', 'radians', 'degrees'],
    formula: 'Advanced mathematical evaluation engine',
    example: {
      input: 'sin(30°) + log(100)',
      output: '2.5',
      explanation: 'sin(30°) = 0.5, log10(100) = 2; sum = 2.5.'
    }
  },
  {
    id: 'algebra-calculator',
    slug: 'algebra-calculator',
    name: 'Algebra Calculator',
    category: 'math',
    description: 'Solve linear equations ax + b = c and 2x2 systems of linear equations.',
    iconName: 'FunctionSquare',
    tags: ['algebra', 'equation', 'linear equation', 'solve for x', 'variable'],
    formula: 'x = (c - b) / a',
    example: {
      input: '3x + 12 = 27',
      output: 'x = 5',
      explanation: 'Subtract 12 (3x = 15), divide by 3 (x = 5).'
    }
  },
  {
    id: 'quadratic-equation-calculator',
    slug: 'quadratic-equation-calculator',
    name: 'Quadratic Equation Calculator',
    category: 'math',
    description: 'Find real and complex roots of quadratic equations ax² + bx + c = 0 with discriminant details.',
    iconName: 'LineChart',
    popular: true,
    tags: ['quadratic', 'algebra', 'roots', 'discriminant', 'parabola', 'vertex'],
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    example: {
      input: 'x² - 5x + 6 = 0',
      output: 'x₁ = 3, x₂ = 2',
      explanation: 'Discriminant Δ = 25 - 24 = 1 > 0. Two distinct real roots.'
    }
  },
  {
    id: 'exponent-calculator',
    slug: 'exponent-calculator',
    name: 'Exponent Calculator',
    category: 'math',
    description: 'Calculate base numbers raised to positive, negative, or fractional power exponents.',
    iconName: 'Zap',
    tags: ['exponent', 'power', 'base', 'power of', 'math'],
    formula: 'Result = Base ^ Exponent',
    example: {
      input: '2 ^ 10',
      output: '1024',
      explanation: '2 multiplied by itself 10 times equals 1024.'
    }
  },
  {
    id: 'square-root-calculator',
    slug: 'square-root-calculator',
    name: 'Square Root Calculator',
    category: 'math',
    description: 'Calculate square roots (√x) and simplified radical forms of any positive number.',
    iconName: 'Check',
    tags: ['square root', 'radical', 'root', 'math', 'sqrt'],
    formula: '√x = y such that y² = x',
    example: {
      input: '√144',
      output: '12',
      explanation: '12 × 12 = 144.'
    }
  },
  {
    id: 'cube-root-calculator',
    slug: 'cube-root-calculator',
    name: 'Cube Root Calculator',
    category: 'math',
    description: 'Find the cube root (∛x) of any positive or negative real number.',
    iconName: 'Box',
    tags: ['cube root', 'cbrt', 'cubic', 'math', 'root'],
    formula: '∛x = y such that y³ = x',
    example: {
      input: '∛125',
      output: '5',
      explanation: '5 × 5 × 5 = 125.'
    }
  },
  {
    id: 'gcd-calculator',
    slug: 'gcd-calculator',
    name: 'GCD Calculator',
    category: 'math',
    description: 'Calculate the Greatest Common Divisor (GCD / HCF) of two or more numbers using Euclidean algorithm.',
    iconName: 'GitMerge',
    tags: ['gcd', 'hcf', 'greatest common divisor', 'euclidean algorithm', 'factors'],
    formula: 'Euclidean Algorithm: GCD(a, b) = GCD(b, a mod b)',
    example: {
      input: '48 and 180',
      output: 'GCD = 12',
      explanation: '12 is the largest integer that divides both 48 and 180.'
    }
  },
  {
    id: 'lcm-calculator',
    slug: 'lcm-calculator',
    name: 'LCM Calculator',
    category: 'math',
    description: 'Find the Least Common Multiple (LCM) of multiple integers quickly.',
    iconName: 'GitFork',
    tags: ['lcm', 'least common multiple', 'multiples', 'math'],
    formula: 'LCM(a, b) = |a × b| / GCD(a, b)',
    example: {
      input: '12 and 18',
      output: 'LCM = 36',
      explanation: '36 is the smallest positive integer divisible by both 12 and 18.'
    }
  },
  {
    id: 'prime-number-checker',
    slug: 'prime-number-checker',
    name: 'Prime Number Checker',
    category: 'math',
    description: 'Check if a number is prime, view its prime factorization decomposition, and find adjacent prime numbers.',
    iconName: 'ShieldCheck',
    tags: ['prime', 'prime number', 'factorization', 'factors', 'composite'],
    formula: 'Trial division up to √N',
    example: {
      input: '97',
      output: 'Prime! (Factors: 1, 97)',
      explanation: '97 has no divisors other than 1 and itself.'
    }
  },
  {
    id: 'factorial-calculator',
    slug: 'factorial-calculator',
    name: 'Factorial Calculator',
    category: 'math',
    description: 'Calculate the factorial (n!) of non-negative integers.',
    iconName: 'AlertCircle',
    tags: ['factorial', 'n!', 'permutations', 'combinatorics'],
    formula: 'n! = n × (n - 1) × (n - 2) × ... × 1',
    example: {
      input: '5!',
      output: '120',
      explanation: '5 × 4 × 3 × 2 × 1 = 120.'
    }
  },
  {
    id: 'percentage-change-calculator',
    slug: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    category: 'math',
    description: 'Determine relative percentage increase or decrease between two numbers.',
    iconName: 'TrendingUp',
    tags: ['percentage change', 'delta', 'variance', 'growth', 'decline'],
    formula: '((New - Old) / Old) × 100%',
    example: {
      input: 'Old: 50, New: 75',
      output: '+50% Increase',
      explanation: '((75 - 50) / 50) × 100 = 50% increase.'
    }
  },
  {
    id: 'probability-calculator',
    slug: 'probability-calculator',
    name: 'Probability Calculator',
    category: 'math',
    description: 'Calculate single event probability, union (A or B), intersection (A and B), and odds.',
    iconName: 'Dices',
    tags: ['probability', 'odds', 'chance', 'events', 'statistics'],
    formula: 'P(E) = Favorable Outcomes / Total Outcomes',
    example: {
      input: '1 favorable out of 6 outcomes',
      output: '16.67% (0.1667)',
      explanation: 'Probability of rolling a specific face on a 6-sided die.'
    }
  },
  {
    id: 'permutation-calculator',
    slug: 'permutation-calculator',
    name: 'Permutation Calculator',
    category: 'math',
    description: 'Find total ordered permutations P(n, k) = n! / (n - k)!. ',
    iconName: 'Layers',
    tags: ['permutation', 'nPr', 'arrangement', 'combinatorics'],
    formula: 'P(n, k) = n! / (n - k)!',
    example: {
      input: 'n = 5, k = 3',
      output: '60',
      explanation: '5 × 4 × 3 = 60 distinct ordered arrangements.'
    }
  },
  {
    id: 'combination-calculator',
    slug: 'combination-calculator',
    name: 'Combination Calculator',
    category: 'math',
    description: 'Calculate unordered combinations C(n, k) = n! / (k!(n - k)!), also known as "n choose k".',
    iconName: 'Grid',
    tags: ['combination', 'nCr', 'n choose k', 'subsets'],
    formula: 'C(n, k) = n! / (k!(n - k)!)',
    example: {
      input: 'n = 5, k = 3',
      output: '10',
      explanation: '10 distinct groups chosen without regard to order.'
    }
  },
  {
    id: 'sequence-calculator',
    slug: 'sequence-calculator',
    name: 'Sequence Calculator',
    category: 'math',
    description: 'Calculate nth term and sum of first n terms for Arithmetic and Geometric progressions.',
    iconName: 'ListOrdered',
    tags: ['sequence', 'arithmetic sequence', 'geometric sequence', 'progression', 'series'],
    formula: 'A_n = a1 + (n-1)d; G_n = a1 × r^(n-1)',
    example: {
      input: 'Arithmetic: a1=2, d=3, n=10',
      output: '10th Term: 29, Sum: 155',
      explanation: '2, 5, 8, 11, 14, 17, 20, 23, 26, 29.'
    }
  },
  {
    id: 'area-calculator',
    slug: 'area-calculator',
    name: 'Area Calculator',
    category: 'math',
    description: 'Calculate 2D surface area for Circle, Rectangle, Triangle, Trapezoid, Ellipse, and Regular Polygon.',
    iconName: 'Square',
    tags: ['area', 'circle', 'rectangle', 'triangle', 'geometry', 'surface area'],
    formula: 'Circle: πr²; Rectangle: w × h; Triangle: ½ × b × h',
    example: {
      input: 'Circle with radius = 5 cm',
      output: '78.54 cm²',
      explanation: 'π × 5² = 25π ≈ 78.54.'
    }
  },
  {
    id: 'perimeter-calculator',
    slug: 'perimeter-calculator',
    name: 'Perimeter Calculator',
    category: 'math',
    description: 'Find boundary perimeter and circumference for geometric shapes.',
    iconName: 'Maximize',
    tags: ['perimeter', 'circumference', 'boundary', 'length', 'geometry'],
    formula: 'Circle Circumference: 2πr; Rectangle: 2(l + w)',
    example: {
      input: 'Rectangle 10m × 5m',
      output: '30m',
      explanation: '2 × (10 + 5) = 30.'
    }
  },
  {
    id: 'volume-calculator',
    slug: 'volume-calculator',
    name: 'Volume Calculator',
    category: 'math',
    description: 'Compute 3D capacity volume for Sphere, Cylinder, Cone, Cube, Rectangular Prism, and Pyramid.',
    iconName: 'Box',
    tags: ['volume', 'sphere', 'cylinder', 'cone', 'cube', 'capacity', '3d'],
    formula: 'Sphere: (4/3)πr³; Cylinder: πr²h; Cube: s³',
    example: {
      input: 'Cylinder with r = 3m, h = 10m',
      output: '282.74 m³',
      explanation: 'π × 3² × 10 = 90π ≈ 282.74.'
    }
  },

  // Finance Calculators
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'finance',
    description: 'Calculate monthly payments, total interest, and total payoff for personal or auto loans.',
    iconName: 'CreditCard',
    popular: true,
    featured: true,
    tags: ['loan', 'interest', 'monthly payment', 'finance', 'debt', 'borrowing'],
    formula: 'PMT = P × (r(1+r)^n) / ((1+r)^n - 1)',
    example: {
      input: '$10,000 at 5% for 3 years',
      output: 'Monthly: $299.71, Interest: $789.53, Total: $10,789.53',
      explanation: 'Calculates amortized loan payment schedule.'
    }
  },
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    description: 'Calculate Equated Monthly Installment (EMI) for home, personal, or car loans with principal vs interest breakdown visual.',
    iconName: 'PieChart',
    popular: true,
    featured: true,
    tags: ['emi', 'installment', 'home loan', 'car loan', 'amortization'],
    formula: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]',
    example: {
      input: '$250,000 at 7% for 20 years',
      output: 'EMI: $1,938.25 / month',
      explanation: 'Principal: $250,000 (53.8%), Interest: $215,179 (46.2%).'
    }
  },
  {
    id: 'simple-interest-calculator',
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    category: 'finance',
    description: 'Calculate simple interest earned or owed over time: I = P × r × t.',
    iconName: 'TrendingUp',
    tags: ['simple interest', 'interest', 'principal', 'investment', 'yield'],
    formula: 'Interest = Principal × Annual Rate × Time in Years',
    example: {
      input: '$5,000 at 6% for 4 years',
      output: 'Interest: $1,200.00, Total Value: $6,200.00',
      explanation: '$5,000 × 0.06 × 4 = $1,200.'
    }
  },
  {
    id: 'compound-interest-calculator',
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    description: 'Calculate future wealth growth with daily, monthly, or annual interest compounding.',
    iconName: 'Landmark',
    popular: true,
    featured: true,
    tags: ['compound interest', 'growth', 'future value', 'investing', 'wealth'],
    formula: 'A = P × (1 + r/n)^(nt)',
    example: {
      input: '$10,000 at 8% compounded monthly for 10 years',
      output: '$22,196.40 (Earned $12,196.40 in interest)',
      explanation: 'Interest compounds on previous interest each month.'
    }
  },
  {
    id: 'investment-calculator',
    slug: 'investment-calculator',
    name: 'Investment Calculator',
    category: 'finance',
    description: 'Project portfolio growth over time with initial deposit and recurring monthly contributions.',
    iconName: 'PiggyBank',
    tags: ['investment', 'portfolio', 'stocks', 'contributions', 'growth', 'wealth'],
    formula: 'Compound interest + annuity monthly contributions formula',
    example: {
      input: '$5,000 start + $300/mo at 7% for 15 years',
      output: 'Total Balance: $103,137.64 (Contributions: $59,000)',
      explanation: 'Demonstrates exponential compounding of recurring contributions.'
    }
  },
  {
    id: 'savings-calculator',
    slug: 'savings-calculator',
    name: 'Savings Calculator',
    category: 'finance',
    description: 'Find out how long it will take to reach your financial goal or how much to save monthly.',
    iconName: 'Target',
    tags: ['savings', 'goal', 'financial planning', 'budget'],
    formula: 'Annuity future value equation solved for target',
    example: {
      input: 'Goal: $20,000, Save: $500/mo at 4% interest',
      output: 'Time needed: 3 Years 1 Month',
      explanation: 'Calculates duration to hit goal with compound interest.'
    }
  },
  {
    id: 'mortgage-calculator',
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    description: 'Estimate home mortgage payments including principal, interest, property taxes, insurance, and HOA fees.',
    iconName: 'Home',
    popular: true,
    tags: ['mortgage', 'home loan', 'property tax', 'pmi', 'real estate', 'housing'],
    formula: 'Monthly Payment = Loan Payment + Taxes/12 + Insurance/12 + HOA',
    example: {
      input: '$400k home, 20% down, 6.5% rate, 30 yrs',
      output: 'Total Monthly: $2,422.33',
      explanation: 'Principal & Interest: $2,022.61 + estimated taxes/insurance.'
    }
  },
  {
    id: 'profit-calculator',
    slug: 'profit-calculator',
    name: 'Profit Calculator',
    category: 'finance',
    description: 'Calculate gross total profit and profit percentage given cost price and selling price.',
    iconName: 'Coins',
    tags: ['profit', 'business', 'revenue', 'cost', 'gain'],
    formula: 'Profit = Selling Price - Cost Price',
    example: {
      input: 'Cost: $60, Selling Price: $100',
      output: 'Profit: $40.00 (66.67% return)',
      explanation: '$100 - $60 = $40 profit.'
    }
  },
  {
    id: 'loss-calculator',
    slug: 'loss-calculator',
    name: 'Loss Calculator',
    category: 'finance',
    description: 'Calculate financial loss and loss percentage when selling below cost.',
    iconName: 'TrendingDown',
    tags: ['loss', 'deficit', 'business', 'negative margin'],
    formula: 'Loss = Cost Price - Selling Price',
    example: {
      input: 'Cost: $100, Selling Price: $80',
      output: 'Loss: $20.00 (20.00% loss)',
      explanation: 'Loss percentage = ($20 / $100) × 100.'
    }
  },
  {
    id: 'profit-margin-calculator',
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    category: 'finance',
    description: 'Calculate gross profit margin percentage and target selling price for business products.',
    iconName: 'Percent',
    tags: ['margin', 'gross margin', 'pricing', 'markup', 'business profit'],
    formula: 'Margin % = ((Selling Price - Cost) / Selling Price) × 100',
    example: {
      input: 'Cost: $70, Target Margin: 30%',
      output: 'Selling Price: $100.00, Profit: $30.00',
      explanation: 'Selling price = Cost / (1 - Margin%) = 70 / 0.7 = $100.'
    }
  },
  {
    id: 'markup-calculator',
    slug: 'markup-calculator',
    name: 'Markup Calculator',
    category: 'finance',
    description: 'Determine retail selling price based on wholesale cost and markup percentage.',
    iconName: 'DollarSign',
    tags: ['markup', 'retail', 'pricing', 'wholesale', 'profit margin'],
    formula: 'Selling Price = Cost × (1 + Markup%)',
    example: {
      input: 'Cost: $50, Markup: 40%',
      output: 'Selling Price: $70.00 (Profit: $20.00)',
      explanation: '$50 × 1.40 = $70.'
    }
  },
  {
    id: 'tax-calculator',
    slug: 'tax-calculator',
    name: 'Tax Calculator',
    category: 'finance',
    description: 'Estimate income tax liabilities, progressive bracket tax breakdown, and net take-home salary.',
    iconName: 'FileText',
    tags: ['tax', 'income tax', 'brackets', 'deductions', 'take home pay'],
    formula: 'Progressive tax bracket sum calculation',
    example: {
      input: 'Income: $60,000, Tax Rate: 20%',
      output: 'Tax Owed: $12,000, Net Income: $48,000',
      explanation: 'Calculates tax based on rate or progressive tax model.'
    }
  },
  {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    category: 'finance',
    description: 'Convert income between hourly, weekly, biweekly, monthly, and annual amounts.',
    iconName: 'Briefcase',
    popular: true,
    tags: ['salary', 'hourly wage', 'paycheck', 'annual salary', 'monthly income'],
    formula: 'Annual = Hourly × Hours/Week × 52 Weeks',
    example: {
      input: '$30/hour at 40 hours/week',
      output: 'Annual: $62,400 | Monthly: $5,200',
      explanation: '$30 × 40 × 52 = $62,400 annual gross salary.'
    }
  },
  {
    id: 'hourly-wage-calculator',
    slug: 'hourly-wage-calculator',
    name: 'Hourly Wage Calculator',
    category: 'finance',
    description: 'Convert an annual or monthly salary into an equivalent hourly wage rate.',
    iconName: 'Clock',
    tags: ['hourly rate', 'wage', 'salary to hourly', 'compensation'],
    formula: 'Hourly Rate = Annual Salary / (Hours per Week × 52)',
    example: {
      input: '$75,000 annual salary at 40 hrs/wk',
      output: '$36.06 / hour',
      explanation: '$75,000 / 2080 hours = $36.06 per hour.'
    }
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'finance',
    description: 'Calculate Return on Investment (ROI) percentage and annualized return on capital.',
    iconName: 'BarChart',
    tags: ['roi', 'return on investment', 'gain', 'yield', 'capital'],
    formula: 'ROI% = ((Net Profit) / Cost of Investment) × 100',
    example: {
      input: 'Invested: $5,000, Returned: $7,500 over 2 years',
      output: 'Total ROI: +50.00%, Annualized ROI: +22.47%',
      explanation: 'Net gain of $2,500 on $5,000 initial principal.'
    }
  },
  {
    id: 'break-even-calculator',
    slug: 'break-even-calculator',
    name: 'Break-Even Calculator',
    category: 'finance',
    description: 'Determine the exact sales volume in units and revenue required to cover fixed and variable costs.',
    iconName: 'Scale',
    tags: ['break even', 'business', 'fixed costs', 'unit economics', 'revenue'],
    formula: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)',
    example: {
      input: 'Fixed: $10,000, Price: $50, Variable: $30',
      output: '500 Units ($25,000 Revenue)',
      explanation: 'Unit margin is $20. $10,000 / $20 = 500 units.'
    }
  },
  {
    id: 'currency-converter',
    slug: 'currency-converter',
    name: 'Currency Converter',
    category: 'finance',
    description: 'Convert between USD, EUR, GBP, PKR, INR, AED, SAR, CAD, AUD, JPY, CNY and global foreign exchange rates.',
    iconName: 'Coins',
    popular: true,
    featured: true,
    tags: ['currency', 'forex', 'exchange rate', 'usd', 'eur', 'gbp', 'inr', 'pkr'],
    formula: 'Converted Amount = Amount × (Target Rate / Source Rate)',
    example: {
      input: '100 USD to EUR',
      output: '≈ 92.50 EUR',
      explanation: 'Live foreign exchange market conversion.'
    },
    faq: [
      { question: 'Does this use live exchange rates?', answer: 'Yes! It fetches live reference exchange rates and updates regularly.' }
    ]
  },

  // Health Calculators
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    description: 'Calculate Body Mass Index (BMI), view WHO weight categories, and find healthy weight range.',
    iconName: 'Activity',
    popular: true,
    featured: true,
    tags: ['bmi', 'body mass index', 'weight', 'height', 'underweight', 'overweight', 'obesity'],
    formula: 'BMI = Weight (kg) / (Height (m))²',
    example: {
      input: 'Height: 175 cm, Weight: 70 kg',
      output: 'BMI: 22.9 (Normal / Healthy Weight)',
      explanation: '70 / (1.75²) = 22.86.'
    },
    faq: [
      { question: 'Is BMI accurate for athletes?', answer: 'BMI does not differentiate muscle mass from fat. Consult a medical professional for individual assessment.' }
    ]
  },
  {
    id: 'bmr-calculator',
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    category: 'health',
    description: 'Calculate Basal Metabolic Rate (BMR) - the total calories burned by your body at complete rest.',
    iconName: 'Flame',
    popular: true,
    tags: ['bmr', 'basal metabolic rate', 'metabolism', 'calories', 'mifflin st jeor'],
    formula: 'Mifflin-St Jeor: 10×weight(kg) + 6.25×height(cm) - 5×age + s',
    example: {
      input: 'Male, 30 yrs, 180 cm, 80 kg',
      output: 'BMR: 1,775 kcal / day',
      explanation: 'Base metabolic rate needed to maintain resting body functions.'
    }
  },
  {
    id: 'daily-calorie-calculator',
    slug: 'daily-calorie-calculator',
    name: 'Daily Calorie Calculator',
    category: 'health',
    description: 'Calculate total daily calorie expenditure (TDEE) for weight maintenance, weight loss, or muscle gain.',
    iconName: 'Apple',
    popular: true,
    featured: true,
    tags: ['tdee', 'calories', 'weight loss', 'maintenance', 'diet', 'nutrition'],
    formula: 'TDEE = BMR × Activity Multiplier',
    example: {
      input: 'BMR: 1775 kcal, Moderate Exercise',
      output: 'Maintenance: 2,750 kcal/day (Weight Loss: 2,250 kcal/day)',
      explanation: 'A 500 kcal daily deficit leads to approx 1 lb (0.45 kg) fat loss per week.'
    }
  },
  {
    id: 'body-fat-percentage-calculator',
    slug: 'body-fat-percentage-calculator',
    name: 'Body Fat Percentage Calculator',
    category: 'health',
    description: 'Estimate body fat percentage using the US Navy tape measure method based on neck, waist, and hip circumference.',
    iconName: 'HeartPulse',
    tags: ['body fat', 'navy method', 'waist', 'fat percentage', 'lean mass'],
    formula: 'US Navy Body Fat Regression Formula',
    example: {
      input: 'Male, Waist: 85 cm, Neck: 38 cm, Height: 178 cm',
      output: '15.4% Body Fat (Fitness Range)',
      explanation: 'Estimates fat mass vs lean body tissue mass.'
    }
  },
  {
    id: 'ideal-weight-calculator',
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight Calculator',
    category: 'health',
    description: 'Compare healthy target body weight computed by Devine, Robinson, Miller, and Hamwi medical formulas.',
    iconName: 'Scale',
    tags: ['ideal weight', 'healthy weight', 'devine formula', 'target weight'],
    formula: 'Devine Male: 50 kg + 2.3 kg × (Height in inches - 60)',
    example: {
      input: 'Male, Height: 5 ft 10 in (178 cm)',
      output: 'Ideal Weight: 68 - 73 kg (150 - 161 lbs)',
      explanation: 'Composite baseline target based on clinical literature.'
    }
  },
  {
    id: 'macro-calculator',
    slug: 'macro-calculator',
    name: 'Macro Calculator',
    category: 'health',
    description: 'Calculate recommended daily macronutrient intake (Protein, Carbohydrates, and Fats in grams).',
    iconName: 'PieChart',
    tags: ['macros', 'macronutrients', 'protein', 'carbs', 'fat', 'keto', 'fitness'],
    formula: 'Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g',
    example: {
      input: '2,400 kcal diet, Muscle Building',
      output: '180g Protein (30%), 270g Carbs (45%), 67g Fat (25%)',
      explanation: 'Balanced macro ratio tailored for athletic performance.'
    }
  },
  {
    id: 'water-intake-calculator',
    slug: 'water-intake-calculator',
    name: 'Water Intake Calculator',
    category: 'health',
    description: 'Determine how much water you should drink daily based on body weight, exercise level, and climate.',
    iconName: 'Droplet',
    tags: ['water intake', 'hydration', 'fluid', 'health', 'daily water'],
    formula: 'Base Water = Weight (kg) × 35 ml + Exercise Additions',
    example: {
      input: 'Weight: 75 kg, 45 min workout',
      output: '3.1 Liters (105 fl oz) per day',
      explanation: 'Replenishes baseline metabolism and sweat losses.'
    }
  },
  {
    id: 'pregnancy-due-date-calculator',
    slug: 'pregnancy-due-date-calculator',
    name: 'Pregnancy Due Date Calculator',
    category: 'health',
    description: 'Estimate baby due date, current gestational age in weeks, and pregnancy trimester timeline using Naegele rule.',
    iconName: 'Heart',
    tags: ['pregnancy', 'due date', 'gestational age', 'trimester', 'baby', 'conception'],
    formula: 'Naegele Rule: First day of last period + 280 days',
    example: {
      input: 'LMP: Oct 1, 2025',
      output: 'Estimated Due Date: July 8, 2026',
      explanation: 'Standard 40-week gestation calculation.'
    }
  },

  // Conversion Calculators
  {
    id: 'length-converter',
    slug: 'length-converter',
    name: 'Length Converter',
    category: 'conversion',
    description: 'Convert distance between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.',
    iconName: 'Ruler',
    popular: true,
    tags: ['length', 'distance', 'cm', 'meter', 'km', 'inch', 'feet', 'miles', 'yard'],
    formula: 'Standard SI unit conversion ratios',
    example: {
      input: '6 Feet',
      output: '182.88 cm (1.8288 meters)',
      explanation: '1 foot = 30.48 centimeters.'
    }
  },
  {
    id: 'weight-converter',
    slug: 'weight-converter',
    name: 'Weight Converter',
    category: 'conversion',
    description: 'Convert weight and mass between milligrams, grams, kilograms, metric tons, ounces, pounds, and stones.',
    iconName: 'Scale',
    popular: true,
    tags: ['weight', 'mass', 'kg', 'grams', 'lbs', 'pounds', 'ounces', 'stone'],
    formula: '1 kg = 2.20462 lbs',
    example: {
      input: '70 kg',
      output: '154.32 lbs',
      explanation: '70 × 2.20462 = 154.32 pounds.'
    }
  },
  {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    category: 'conversion',
    description: 'Convert temperature values instantly between Celsius (°C), Fahrenheit (°F), and Kelvin (K).',
    iconName: 'Thermometer',
    popular: true,
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'heat', 'weather'],
    formula: '°F = (°C × 9/5) + 32; K = °C + 273.15',
    example: {
      input: '100 °C',
      output: '212 °F (373.15 K)',
      explanation: 'Water boiling point under standard atmospheric pressure.'
    }
  },
  {
    id: 'area-converter',
    slug: 'area-converter',
    name: 'Area Converter',
    category: 'conversion',
    description: 'Convert surface area between sq meters, sq kilometers, sq feet, sq yards, acres, and hectares.',
    iconName: 'Square',
    tags: ['area converter', 'acres', 'hectares', 'sq ft', 'sq meters', 'land area'],
    formula: '1 Acre = 4046.86 sq meters = 43,560 sq ft',
    example: {
      input: '1 Acre',
      output: '4,046.86 m² (43,560 sq ft)',
      explanation: 'Standard real estate land area conversion.'
    }
  },
  {
    id: 'volume-converter',
    slug: 'volume-converter',
    name: 'Volume Converter',
    category: 'conversion',
    description: 'Convert fluid and 3D volume between milliliters, liters, cubic meters, fluid ounces, cups, pints, quarts, and gallons.',
    iconName: 'Droplet',
    tags: ['volume converter', 'liters', 'gallons', 'ml', 'cups', 'fl oz', 'quarts'],
    formula: '1 US Gallon = 3.78541 Liters',
    example: {
      input: '5 Liters',
      output: '1.321 US Gallons (169.07 fl oz)',
      explanation: '5 / 3.78541 = 1.321 gallons.'
    }
  },
  {
    id: 'speed-converter',
    slug: 'speed-converter',
    name: 'Speed Converter',
    category: 'conversion',
    description: 'Convert velocity between meters/second (m/s), km/h, miles per hour (mph), knots, and feet/second.',
    iconName: 'Gauge',
    tags: ['speed', 'velocity', 'mph', 'kmh', 'knots', 'meters per second'],
    formula: '1 mph = 1.60934 km/h',
    example: {
      input: '60 mph',
      output: '96.56 km/h (26.82 m/s)',
      explanation: 'Standard highway vehicle speed conversion.'
    }
  },
  {
    id: 'time-converter',
    slug: 'time-converter',
    name: 'Time Converter',
    category: 'conversion',
    description: 'Convert time units between milliseconds, seconds, minutes, hours, days, weeks, months, and years.',
    iconName: 'Clock',
    tags: ['time converter', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'milliseconds'],
    formula: '1 Day = 86,400 Seconds = 1,440 Minutes',
    example: {
      input: '10,000 Seconds',
      output: '2 Hours 46 Minutes 40 Seconds',
      explanation: '10,000 / 3,600 = 2.777 hours.'
    }
  },
  {
    id: 'data-storage-converter',
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    category: 'conversion',
    description: 'Convert digital storage between Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB).',
    iconName: 'HardDrive',
    popular: true,
    tags: ['data', 'bytes', 'kb', 'mb', 'gb', 'tb', 'petabytes', 'storage', 'ram'],
    formula: '1 GB = 1,024 MB = 1,048,576 KB',
    example: {
      input: '1 TB',
      output: '1,024 GB (1,048,576 MB)',
      explanation: 'Binary data capacity multiplier (1024).'
    }
  },
  {
    id: 'energy-converter',
    slug: 'energy-converter',
    name: 'Energy Converter',
    category: 'conversion',
    description: 'Convert energy units between Joules, Kilojoules, Calories, Kilocalories (kcal), Watt-hours, Kilowatt-hours (kWh), and BTU.',
    iconName: 'Zap',
    tags: ['energy', 'joule', 'calories', 'kwh', 'btu', 'watt hour', 'power energy'],
    formula: '1 kWh = 3.6 × 10⁶ Joules = 860.42 kcal',
    example: {
      input: '100 kWh',
      output: '360,000,000 Joules (86,042 kcal)',
      explanation: 'Standard electrical energy bill unit.'
    }
  },
  {
    id: 'pressure-converter',
    slug: 'pressure-converter',
    name: 'Pressure Converter',
    category: 'conversion',
    description: 'Convert pressure values between Pascals (Pa), kPa, Bar, PSI (pounds per sq inch), and Atmospheres (atm).',
    iconName: 'Compass',
    tags: ['pressure', 'psi', 'bar', 'pascal', 'atm', 'tire pressure'],
    formula: '1 Bar = 14.5038 PSI = 100,000 Pa',
    example: {
      input: '32 PSI',
      output: '2.206 Bar (220.6 kPa)',
      explanation: 'Typical automotive tire pressure.'
    }
  },
  {
    id: 'power-converter',
    slug: 'power-converter',
    name: 'Power Converter',
    category: 'conversion',
    description: 'Convert power between Watts (W), Kilowatts (kW), Megawatts (MW), and Horsepower (hp).',
    iconName: 'Cpu',
    tags: ['power', 'watt', 'kilowatt', 'horsepower', 'engine power'],
    formula: '1 Metric Horsepower (hp) ≈ 735.5 Watts',
    example: {
      input: '300 hp',
      output: '220.65 kW (220,650 Watts)',
      explanation: 'Vehicle engine horsepower to kilowatt conversion.'
    }
  },
  {
    id: 'frequency-converter',
    slug: 'frequency-converter',
    name: 'Frequency Converter',
    category: 'conversion',
    description: 'Convert frequency cycles between Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), and Gigahertz (GHz).',
    iconName: 'Radio',
    tags: ['frequency', 'hertz', 'mhz', 'ghz', 'khz', 'cycles', 'cpu frequency'],
    formula: '1 GHz = 1,000 MHz = 1,000,000,000 Hz',
    example: {
      input: '3.5 GHz',
      output: '3,500 MHz (3,500,000,000 Hz)',
      explanation: 'Modern computer CPU clock speed.'
    }
  },
  {
    id: 'fuel-economy-converter',
    slug: 'fuel-economy-converter',
    name: 'Fuel Economy Converter',
    category: 'conversion',
    description: 'Convert vehicle fuel consumption between MPG (US), MPG (UK), Liters/100km (L/100km), and km/L.',
    iconName: 'Fuel',
    tags: ['fuel economy', 'mpg', 'liters per 100km', 'gas mileage', 'kml'],
    formula: 'L/100km = 235.215 / MPG (US)',
    example: {
      input: '30 MPG (US)',
      output: '7.84 L/100km (12.75 km/L)',
      explanation: 'Converts miles per gallon into liters used per 100 km.'
    }
  },

  // Date & Time Calculators
  {
    id: 'date-difference-calculator',
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    category: 'date-time',
    description: 'Calculate the exact interval between two dates in years, months, weeks, and days.',
    iconName: 'Calendar',
    popular: true,
    tags: ['date difference', 'days between', 'calendar', 'duration', 'interval'],
    formula: 'Calendar difference logic with month length awareness',
    example: {
      input: 'Jan 1, 2026 to Dec 31, 2026',
      output: '364 Days (52 Weeks)',
      explanation: 'Total calendar span within the year 2026.'
    }
  },
  {
    id: 'days-between-dates',
    slug: 'days-between-dates',
    name: 'Days Between Dates',
    category: 'date-time',
    description: 'Find total number of calendar days between start and end dates (with option to include end date).',
    iconName: 'CalendarDays',
    tags: ['days between', 'count days', 'calendar days', 'date span'],
    formula: 'Abs(EndTimestamp - StartTimestamp) / 86400000',
    example: {
      input: 'March 1, 2026 to March 15, 2026',
      output: '14 Days (15 days inclusive)',
      explanation: 'Span of two weeks.'
    }
  },
  {
    id: 'time-difference-calculator',
    slug: 'time-difference-calculator',
    name: 'Time Difference Calculator',
    category: 'date-time',
    description: 'Calculate elapsed hours and minutes between two time stamps in a day.',
    iconName: 'Clock',
    tags: ['time difference', 'elapsed time', 'hours worked', 'time gap'],
    formula: 'End Time - Start Time (accounting for midnight overflow)',
    example: {
      input: '9:00 AM to 5:30 PM',
      output: '8 Hours 30 Minutes',
      explanation: 'Standard work shift duration.'
    }
  },
  {
    id: 'countdown-calculator',
    slug: 'countdown-calculator',
    name: 'Countdown Calculator',
    category: 'date-time',
    description: 'Create a live real-time countdown timer to any future date, holiday, birthday, or event.',
    iconName: 'Timer',
    popular: true,
    tags: ['countdown', 'timer', 'event timer', 'future date', 'days left'],
    formula: 'Live tick loop: Target Time - Current Time',
    example: {
      input: 'New Year 2027',
      output: 'Real-time live ticking display in days, hours, mins, secs',
      explanation: 'Updates automatically every second.'
    }
  },
  {
    id: 'week-number-calculator',
    slug: 'week-number-calculator',
    name: 'Week Number Calculator',
    category: 'date-time',
    description: 'Find ISO-8601 week number for any given date and view full annual week numbers table.',
    iconName: 'CalendarRange',
    tags: ['week number', 'iso week', 'calendar week', 'work week'],
    formula: 'ISO-8601 week reckoning algorithm',
    example: {
      input: 'August 17, 2026',
      output: 'Week #34 of 2026',
      explanation: 'ISO week starting Monday.'
    }
  },
  {
    id: 'leap-year-checker',
    slug: 'leap-year-checker',
    name: 'Leap Year Checker',
    category: 'date-time',
    description: 'Check whether a year is a leap year (366 days) and view past/future leap year lists.',
    iconName: 'HelpCircle',
    tags: ['leap year', 'february 29', '366 days', 'calendar year'],
    formula: '(Year % 4 === 0 && Year % 100 !== 0) || (Year % 400 === 0)',
    example: {
      input: 'Year 2028',
      output: 'Yes! 2028 is a Leap Year (366 Days)',
      explanation: '2028 is divisible by 4 and not a century year.'
    }
  }
];
