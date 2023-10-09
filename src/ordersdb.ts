import {
  Dimension,
  DateDimension,
  Attribute,
  createAttribute,
  createDateDimension,
  createDimension,
} from '@sisense/sdk-data';

export const DataSource = 'OrdersDB';

interface BenchmarkCustomerDimension extends Dimension {
  CohortName: Attribute;
  Company: Attribute;
  MemberType: Attribute;
  PeerCompanyID: Attribute;
}
export const BenchmarkCustomer = createDimension({
  name: 'BenchmarkCustomer',
  CohortName: createAttribute({
    name: 'CohortName',
    type: 'text-attribute',
    expression: '[BenchmarkCustomer.Cohort Name]',
  }),
  Company: createAttribute({
    name: 'Company',
    type: 'text-attribute',
    expression: '[BenchmarkCustomer.Company]',
  }),
  MemberType: createAttribute({
    name: 'MemberType',
    type: 'text-attribute',
    expression: '[BenchmarkCustomer.Member Type]',
  }),
  PeerCompanyID: createAttribute({
    name: 'PeerCompanyID',
    type: 'numeric-attribute',
    expression: '[BenchmarkCustomer.Peer CompanyID]',
  }),
}) as BenchmarkCustomerDimension;

interface CATEGORIES1Dimension extends Dimension {
  CategoryNameOrdered: Attribute;
  CATEGORY_ID: Attribute;
  CATEGORY_NAME: Attribute;
}
export const CATEGORIES1 = createDimension({
  name: 'CATEGORIES1',
  CategoryNameOrdered: createAttribute({
    name: 'CategoryNameOrdered',
    type: 'text-attribute',
    expression: '[CATEGORIES1.Category Name Ordered]',
  }),
  CATEGORY_ID: createAttribute({
    name: 'CATEGORY_ID',
    type: 'numeric-attribute',
    expression: '[CATEGORIES1.CATEGORY_ID]',
  }),
  CATEGORY_NAME: createAttribute({
    name: 'CATEGORY_NAME',
    type: 'text-attribute',
    expression: '[CATEGORIES1.CATEGORY_NAME]',
  }),
}) as CATEGORIES1Dimension;

interface CUSTOMERS1Dimension extends Dimension {
  ADDRESS: Attribute;
  CITY: Attribute;
  COMPANY_NAME: Attribute;
  CUSTOMER_ID: Attribute;
  Industry: Attribute;
  INDUSTRY0: Attribute;
  Region: Attribute;
  REGION_ID: Attribute;
  RESELLER: Attribute;
  STATE: Attribute;
  ZIP: Attribute;
}
export const CUSTOMERS1 = createDimension({
  name: 'CUSTOMERS1',
  ADDRESS: createAttribute({
    name: 'ADDRESS',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.ADDRESS]',
  }),
  CITY: createAttribute({
    name: 'CITY',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.CITY]',
  }),
  COMPANY_NAME: createAttribute({
    name: 'COMPANY_NAME',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.COMPANY_NAME]',
  }),
  CUSTOMER_ID: createAttribute({
    name: 'CUSTOMER_ID',
    type: 'numeric-attribute',
    expression: '[CUSTOMERS1.CUSTOMER_ID]',
  }),
  Industry: createAttribute({
    name: 'Industry',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.Industry]',
  }),
  INDUSTRY0: createAttribute({
    name: 'INDUSTRY0',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.INDUSTRY0]',
  }),
  Region: createAttribute({
    name: 'Region',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.Region]',
  }),
  REGION_ID: createAttribute({
    name: 'REGION_ID',
    type: 'numeric-attribute',
    expression: '[CUSTOMERS1.REGION_ID]',
  }),
  RESELLER: createAttribute({
    name: 'RESELLER',
    type: 'numeric-attribute',
    expression: '[CUSTOMERS1.RESELLER]',
  }),
  STATE: createAttribute({
    name: 'STATE',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.STATE]',
  }),
  ZIP: createAttribute({
    name: 'ZIP',
    type: 'text-attribute',
    expression: '[CUSTOMERS1.ZIP]',
  }),
}) as CUSTOMERS1Dimension;

interface EmployeeBenchmarkDimension extends Dimension {
  ColorFlag: Attribute;
  EmpID: Attribute;
  EmpIDPeer: Attribute;
  EmployeeDisplay: Attribute;
  EmployeeMask: Attribute;
  EmployeeName: Attribute;
  Level: Attribute;
}
export const EmployeeBenchmark = createDimension({
  name: 'Employee Benchmark',
  ColorFlag: createAttribute({
    name: 'ColorFlag',
    type: 'numeric-attribute',
    expression: '[Employee Benchmark.Color Flag]',
  }),
  EmpID: createAttribute({
    name: 'EmpID',
    type: 'numeric-attribute',
    expression: '[Employee Benchmark.EmpID]',
  }),
  EmpIDPeer: createAttribute({
    name: 'EmpIDPeer',
    type: 'numeric-attribute',
    expression: '[Employee Benchmark.EmpIDPeer]',
  }),
  EmployeeDisplay: createAttribute({
    name: 'EmployeeDisplay',
    type: 'text-attribute',
    expression: '[Employee Benchmark.Employee Display]',
  }),
  EmployeeMask: createAttribute({
    name: 'EmployeeMask',
    type: 'text-attribute',
    expression: '[Employee Benchmark.Employee Mask]',
  }),
  EmployeeName: createAttribute({
    name: 'EmployeeName',
    type: 'text-attribute',
    expression: '[Employee Benchmark.Employee Name]',
  }),
  Level: createAttribute({
    name: 'Level',
    type: 'text-attribute',
    expression: '[Employee Benchmark.Level]',
  }),
}) as EmployeeBenchmarkDimension;

interface FirstOrderDateDimension extends Dimension {
  CID: Attribute;
  FirstFlag: Attribute;
  ODate: DateDimension;
}
export const FirstOrderDate = createDimension({
  name: 'First OrderDate',
  CID: createAttribute({
    name: 'CID',
    type: 'numeric-attribute',
    expression: '[First OrderDate.CID]',
  }),
  FirstFlag: createAttribute({
    name: 'FirstFlag',
    type: 'text-attribute',
    expression: '[First OrderDate.First Flag]',
  }),
  ODate: createDateDimension({
    name: 'ODate',
    expression: '[First OrderDate.ODate (Calendar)]',
  }),
}) as FirstOrderDateDimension;

interface ORDER_DETAILS1Dimension extends Dimension {
  Amount: Attribute;
  ORDER_ID: Attribute;
  PRODUCT_ID: Attribute;
  QUANTITY: Attribute;
}
export const ORDER_DETAILS1 = createDimension({
  name: 'ORDER_DETAILS1',
  Amount: createAttribute({
    name: 'Amount',
    type: 'numeric-attribute',
    expression: '[ORDER_DETAILS1.Amount]',
  }),
  ORDER_ID: createAttribute({
    name: 'ORDER_ID',
    type: 'numeric-attribute',
    expression: '[ORDER_DETAILS1.ORDER_ID]',
  }),
  PRODUCT_ID: createAttribute({
    name: 'PRODUCT_ID',
    type: 'numeric-attribute',
    expression: '[ORDER_DETAILS1.PRODUCT_ID]',
  }),
  QUANTITY: createAttribute({
    name: 'QUANTITY',
    type: 'numeric-attribute',
    expression: '[ORDER_DETAILS1.QUANTITY]',
  }),
}) as ORDER_DETAILS1Dimension;

interface OrderRollupDimension extends Dimension {
  Amount2: Attribute;
  ORDER_ID: Attribute;
}
export const OrderRollup = createDimension({
  name: 'OrderRollup',
  Amount2: createAttribute({
    name: 'Amount2',
    type: 'numeric-attribute',
    expression: '[OrderRollup.Amount2]',
  }),
  ORDER_ID: createAttribute({
    name: 'ORDER_ID',
    type: 'numeric-attribute',
    expression: '[OrderRollup.ORDER_ID]',
  }),
}) as OrderRollupDimension;

interface ORDERS1Dimension extends Dimension {
  CurrentMonth: Attribute;
  CurrentQTR: Attribute;
  CUSTOMER_ID: Attribute;
  CustomerRank: Attribute;
  CustomerRankPrev: Attribute;
  DateInt: Attribute;
  DateRank: Attribute;
  DateRankPrev: Attribute;
  Description: Attribute;
  DISCOUNT: Attribute;
  EMPLOYEE_ID: Attribute;
  EMPQTR: Attribute;
  HODEST: Attribute;
  HODPST: Attribute;
  ModTS: Attribute;
  MONTH_NAME: Attribute;
  OrderDateString: Attribute;
  OrderFlag: Attribute;
  OrderTimeHrs: Attribute;
  ORDER_ID: Attribute;
  OrderDayDiff: Attribute;
  PAID: Attribute;
  QTR: Attribute;
  QTRNum: Attribute;
  Rank: Attribute;
  ShippingFee: Attribute;
  Status: Attribute;
  Title: Attribute;
  Type: Attribute;
  UTS: Attribute;
  UTSDays: Attribute;
  YTDFlag: Attribute;
  DayOfWeek: DateDimension;
  MontOfYear: DateDimension;
  OrderDate: DateDimension;
  OrderTimestamp: DateDimension;
  ORDER_DATE: DateDimension;
  OrderDate2: DateDimension;
}
export const ORDERS1 = createDimension({
  name: 'ORDERS1',
  CurrentMonth: createAttribute({
    name: 'CurrentMonth',
    type: 'text-attribute',
    expression: '[ORDERS1.Current Month]',
  }),
  CurrentQTR: createAttribute({
    name: 'CurrentQTR',
    type: 'text-attribute',
    expression: '[ORDERS1.Current QTR]',
  }),
  CUSTOMER_ID: createAttribute({
    name: 'CUSTOMER_ID',
    type: 'numeric-attribute',
    expression: '[ORDERS1.CUSTOMER_ID]',
  }),
  CustomerRank: createAttribute({
    name: 'CustomerRank',
    type: 'text-attribute',
    expression: '[ORDERS1.CustomerRank]',
  }),
  CustomerRankPrev: createAttribute({
    name: 'CustomerRankPrev',
    type: 'text-attribute',
    expression: '[ORDERS1.CustomerRankPrev]',
  }),
  DateInt: createAttribute({
    name: 'DateInt',
    type: 'text-attribute',
    expression: '[ORDERS1.DateInt]',
  }),
  DateRank: createAttribute({
    name: 'DateRank',
    type: 'numeric-attribute',
    expression: '[ORDERS1.DateRank]',
  }),
  DateRankPrev: createAttribute({
    name: 'DateRankPrev',
    type: 'numeric-attribute',
    expression: '[ORDERS1.DateRankPrev]',
  }),
  Description: createAttribute({
    name: 'Description',
    type: 'text-attribute',
    expression: '[ORDERS1.Description]',
  }),
  DISCOUNT: createAttribute({
    name: 'DISCOUNT',
    type: 'numeric-attribute',
    expression: '[ORDERS1.DISCOUNT]',
  }),
  EMPLOYEE_ID: createAttribute({
    name: 'EMPLOYEE_ID',
    type: 'numeric-attribute',
    expression: '[ORDERS1.EMPLOYEE_ID]',
  }),
  EMPQTR: createAttribute({
    name: 'EMPQTR',
    type: 'text-attribute',
    expression: '[ORDERS1.EMPQTR]',
  }),
  HODEST: createAttribute({
    name: 'HODEST',
    type: 'text-attribute',
    expression: '[ORDERS1.HOD EST]',
  }),
  HODPST: createAttribute({
    name: 'HODPST',
    type: 'text-attribute',
    expression: '[ORDERS1.HOD PST]',
  }),
  ModTS: createAttribute({
    name: 'ModTS',
    type: 'numeric-attribute',
    expression: '[ORDERS1.ModTS]',
  }),
  MONTH_NAME: createAttribute({
    name: 'MONTH_NAME',
    type: 'text-attribute',
    expression: '[ORDERS1.MONTH_NAME]',
  }),
  OrderDateString: createAttribute({
    name: 'OrderDateString',
    type: 'text-attribute',
    expression: '[ORDERS1.Order Date String]',
  }),
  OrderFlag: createAttribute({
    name: 'OrderFlag',
    type: 'numeric-attribute',
    expression: '[ORDERS1.Order Flag]',
  }),
  OrderTimeHrs: createAttribute({
    name: 'OrderTimeHrs',
    type: 'text-attribute',
    expression: '[ORDERS1.Order Time Hrs]',
  }),
  ORDER_ID: createAttribute({
    name: 'ORDER_ID',
    type: 'numeric-attribute',
    expression: '[ORDERS1.ORDER_ID]',
  }),
  OrderDayDiff: createAttribute({
    name: 'OrderDayDiff',
    type: 'numeric-attribute',
    expression: '[ORDERS1.OrderDayDiff]',
  }),
  PAID: createAttribute({
    name: 'PAID',
    type: 'numeric-attribute',
    expression: '[ORDERS1.PAID]',
  }),
  QTR: createAttribute({
    name: 'QTR',
    type: 'text-attribute',
    expression: '[ORDERS1.QTR]',
  }),
  QTRNum: createAttribute({
    name: 'QTRNum',
    type: 'numeric-attribute',
    expression: '[ORDERS1.QTRNum]',
  }),
  Rank: createAttribute({
    name: 'Rank',
    type: 'text-attribute',
    expression: '[ORDERS1.Rank]',
  }),
  ShippingFee: createAttribute({
    name: 'ShippingFee',
    type: 'numeric-attribute',
    expression: '[ORDERS1.Shipping Fee]',
  }),
  Status: createAttribute({
    name: 'Status',
    type: 'numeric-attribute',
    expression: '[ORDERS1.Status]',
  }),
  Title: createAttribute({
    name: 'Title',
    type: 'text-attribute',
    expression: '[ORDERS1.Title]',
  }),
  Type: createAttribute({
    name: 'Type',
    type: 'text-attribute',
    expression: '[ORDERS1.Type]',
  }),
  UTS: createAttribute({
    name: 'UTS',
    type: 'numeric-attribute',
    expression: '[ORDERS1.UTS]',
  }),
  UTSDays: createAttribute({
    name: 'UTSDays',
    type: 'numeric-attribute',
    expression: '[ORDERS1.UTS Days]',
  }),
  YTDFlag: createAttribute({
    name: 'YTDFlag',
    type: 'text-attribute',
    expression: '[ORDERS1.YTDFlag]',
  }),
  DayOfWeek: createDateDimension({
    name: 'DayOfWeek',
    expression: '[ORDERS1.Day Of Week (Calendar)]',
  }),
  MontOfYear: createDateDimension({
    name: 'MontOfYear',
    expression: '[ORDERS1.MontOfYear (Calendar)]',
  }),
  OrderDate: createDateDimension({
    name: 'OrderDate',
    expression: '[ORDERS1.Order Date (Calendar)]',
  }),
  OrderTimestamp: createDateDimension({
    name: 'OrderTimestamp',
    expression: '[ORDERS1.Order Timestamp (Calendar)]',
  }),
  ORDER_DATE: createDateDimension({
    name: 'ORDER_DATE',
    expression: '[ORDERS1.ORDER_DATE (Calendar)]',
  }),
  OrderDate2: createDateDimension({
    name: 'OrderDate2',
    expression: '[ORDERS1.OrderDate2 (Calendar)]',
  }),
}) as ORDERS1Dimension;

interface ParametersDimension extends Dimension {
  DiscountParam: Attribute;
  PriceParam: Attribute;
}
export const Parameters = createDimension({
  name: 'Parameters',
  DiscountParam: createAttribute({
    name: 'DiscountParam',
    type: 'numeric-attribute',
    expression: '[Parameters.DiscountParam]',
  }),
  PriceParam: createAttribute({
    name: 'PriceParam',
    type: 'numeric-attribute',
    expression: '[Parameters.PriceParam]',
  }),
}) as ParametersDimension;

interface PRODUCTS1Dimension extends Dimension {
  CATEGORY_ID: Attribute;
  DESCRIPTION: Attribute;
  NUMBER_INSTOCK: Attribute;
  PRICE: Attribute;
  PRODUCT_ID: Attribute;
  PRODUCT_NAME: Attribute;
  REORDER_LEVEL: Attribute;
  SUPPLIER_ID: Attribute;
}
export const PRODUCTS1 = createDimension({
  name: 'PRODUCTS1',
  CATEGORY_ID: createAttribute({
    name: 'CATEGORY_ID',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.CATEGORY_ID]',
  }),
  DESCRIPTION: createAttribute({
    name: 'DESCRIPTION',
    type: 'text-attribute',
    expression: '[PRODUCTS1.DESCRIPTION]',
  }),
  NUMBER_INSTOCK: createAttribute({
    name: 'NUMBER_INSTOCK',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.NUMBER_INSTOCK]',
  }),
  PRICE: createAttribute({
    name: 'PRICE',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.PRICE]',
  }),
  PRODUCT_ID: createAttribute({
    name: 'PRODUCT_ID',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.PRODUCT_ID]',
  }),
  PRODUCT_NAME: createAttribute({
    name: 'PRODUCT_NAME',
    type: 'text-attribute',
    expression: '[PRODUCTS1.PRODUCT_NAME]',
  }),
  REORDER_LEVEL: createAttribute({
    name: 'REORDER_LEVEL',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.REORDER_LEVEL]',
  }),
  SUPPLIER_ID: createAttribute({
    name: 'SUPPLIER_ID',
    type: 'numeric-attribute',
    expression: '[PRODUCTS1.SUPPLIER_ID]',
  }),
}) as PRODUCTS1Dimension;

interface QTRSalesDimension extends Dimension {
  Amount: Attribute;
  EMPLOYEE_ID: Attribute;
  QTRNum: Attribute;
}
export const QTRSales = createDimension({
  name: 'QTRSales',
  Amount: createAttribute({
    name: 'Amount',
    type: 'numeric-attribute',
    expression: '[QTRSales.Amount]',
  }),
  EMPLOYEE_ID: createAttribute({
    name: 'EMPLOYEE_ID',
    type: 'numeric-attribute',
    expression: '[QTRSales.EMPLOYEE_ID]',
  }),
  QTRNum: createAttribute({
    name: 'QTRNum',
    type: 'numeric-attribute',
    expression: '[QTRSales.QTRNum]',
  }),
}) as QTRSalesDimension;

interface SALES_EMPLOYEES1Dimension extends Dimension {
  EMP_LEVEL: Attribute;
  EmployeeMask: Attribute;
  EmployeeName: Attribute;
  EmployeeType: Attribute;
  EMPLOYEE_ID: Attribute;
  FIRST_NAME: Attribute;
  FullName: Attribute;
  LAST_NAME: Attribute;
  MANAGER_ID: Attribute;
  QUOTA: Attribute;
  REGION_ID: Attribute;
}
export const SALES_EMPLOYEES1 = createDimension({
  name: 'SALES_EMPLOYEES1',
  EMP_LEVEL: createAttribute({
    name: 'EMP_LEVEL',
    type: 'numeric-attribute',
    expression: '[SALES_EMPLOYEES1.EMP_LEVEL]',
  }),
  EmployeeMask: createAttribute({
    name: 'EmployeeMask',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.Employee Mask]',
  }),
  EmployeeName: createAttribute({
    name: 'EmployeeName',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.Employee Name]',
  }),
  EmployeeType: createAttribute({
    name: 'EmployeeType',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.Employee Type]',
  }),
  EMPLOYEE_ID: createAttribute({
    name: 'EMPLOYEE_ID',
    type: 'numeric-attribute',
    expression: '[SALES_EMPLOYEES1.EMPLOYEE_ID]',
  }),
  FIRST_NAME: createAttribute({
    name: 'FIRST_NAME',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.FIRST_NAME]',
  }),
  FullName: createAttribute({
    name: 'FullName',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.FullName]',
  }),
  LAST_NAME: createAttribute({
    name: 'LAST_NAME',
    type: 'text-attribute',
    expression: '[SALES_EMPLOYEES1.LAST_NAME]',
  }),
  MANAGER_ID: createAttribute({
    name: 'MANAGER_ID',
    type: 'numeric-attribute',
    expression: '[SALES_EMPLOYEES1.MANAGER_ID]',
  }),
  QUOTA: createAttribute({
    name: 'QUOTA',
    type: 'numeric-attribute',
    expression: '[SALES_EMPLOYEES1.QUOTA]',
  }),
  REGION_ID: createAttribute({
    name: 'REGION_ID',
    type: 'numeric-attribute',
    expression: '[SALES_EMPLOYEES1.REGION_ID]',
  }),
}) as SALES_EMPLOYEES1Dimension;

interface SalesTargetDimension extends Dimension {
  EmpID: Attribute;
  EmpQTR: Attribute;
  QTRNum: Attribute;
  Quota: Attribute;
  Seed: Attribute;
  Target: Attribute;
}
export const SalesTarget = createDimension({
  name: 'SalesTarget',
  EmpID: createAttribute({
    name: 'EmpID',
    type: 'numeric-attribute',
    expression: '[SalesTarget.EmpID]',
  }),
  EmpQTR: createAttribute({
    name: 'EmpQTR',
    type: 'text-attribute',
    expression: '[SalesTarget.EmpQTR]',
  }),
  QTRNum: createAttribute({
    name: 'QTRNum',
    type: 'numeric-attribute',
    expression: '[SalesTarget.QTRNum]',
  }),
  Quota: createAttribute({
    name: 'Quota',
    type: 'numeric-attribute',
    expression: '[SalesTarget.Quota]',
  }),
  Seed: createAttribute({
    name: 'Seed',
    type: 'numeric-attribute',
    expression: '[SalesTarget.Seed]',
  }),
  Target: createAttribute({
    name: 'Target',
    type: 'numeric-attribute',
    expression: '[SalesTarget.Target]',
  }),
}) as SalesTargetDimension;

interface us_zipcodesDimension extends Dimension {
  latitude: Attribute;
  longitude: Attribute;
  primary_city: Attribute;
  state: Attribute;
  zip: Attribute;
}
export const us_zipcodes = createDimension({
  name: 'us_zipcodes',
  latitude: createAttribute({
    name: 'latitude',
    type: 'numeric-attribute',
    expression: '[us_zipcodes.latitude]',
  }),
  longitude: createAttribute({
    name: 'longitude',
    type: 'numeric-attribute',
    expression: '[us_zipcodes.longitude]',
  }),
  primary_city: createAttribute({
    name: 'primary_city',
    type: 'text-attribute',
    expression: '[us_zipcodes.primary_city]',
  }),
  state: createAttribute({
    name: 'state',
    type: 'text-attribute',
    expression: '[us_zipcodes.state]',
  }),
  zip: createAttribute({
    name: 'zip',
    type: 'text-attribute',
    expression: '[us_zipcodes.zip]',
  }),
}) as us_zipcodesDimension;
