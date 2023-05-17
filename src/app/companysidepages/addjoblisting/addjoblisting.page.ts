import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service'; 

import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
  uploadBytes,
  deleteObject
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-addjoblisting',
  templateUrl: '/addjoblisting.page.html',
  styleUrls: ['/addjoblisting.page.scss'],
})
export class AddjoblistingPage implements OnInit {
  job: any = [];
  determine: boolean = true;
  credentials: FormGroup;
  queryinit: any[];
  checkeditems: any = [];
  checkeds: number = 0;
  textbox: any = "test";
  filteredquery: any = [
    {
        "position": "Territory Manager",
        "id": "03kGtO9SLirB02bD1AJm"
    },
    {
        "position": "Recruitment Officer",
        "id": "05AOzfg6ja6yimOaHlcW"
    },
    {
        "position": "Sports Coach",
        "id": "0cWC2h4UvHXrZ4JCZFgo"
    },
    {
        "position": "SAP Consultant",
        "id": "0fjveC8402NpxBQAcrIm"
    },
    {
        "position": "Insurance Adviser",
        "id": "0wlhp92GC4uJpoRIIUD6"
    },
    {
        "position": "Chief Executive Officer ",
        "id": "12JbaPmvAqeuABdD6b80"
    },
    {
        "position": "Reservations Agent",
        "id": "13Z9K4LlASfNAOXH5917"
    },
    {
        "position": "Software Test Engineer",
        "id": "152bpIa1gvCF0XBKJhmA"
    },
    {
        "position": "Service Delivery Manager",
        "id": "160C1SAXAeIwMp7GZBWo"
    },
    {
        "position": "Cook",
        "id": "1DNwV2YE2ggTn1Bh2KM1"
    },
    {
        "position": "Quality Assurance Inspector",
        "id": "1Hg7Y8Z0QgXX1yjNrRyY"
    },
    {
        "position": "Testing Analyst",
        "id": "1Nr1t0sU8YlFnHeRWh7o"
    },
    {
        "position": "Centre Manager ",
        "id": "1PleJ64wXJCP9ZS8wBtK"
    },
    {
        "position": "Sales Assistant",
        "id": "1RO9kEFxlYBFYw3qsOIn"
    },
    {
        "position": "General Assistant",
        "id": "1S4mdVOce0z99jqDEvSy"
    },
    {
        "position": "Bookkeeper",
        "id": "1VKH7sB2FZxHYBZhte4z"
    },
    {
        "position": "Assistant Product Manager",
        "id": "1ZX5sczFpw8aKQWJptvW"
    },
    {
        "position": "Housekeeping Attendant",
        "id": "1Zn5O1D31bQs97yVvJbA"
    },
    {
        "position": "Systems Engineer",
        "id": "1aYBBrkQ2MmvEtKU8Yht"
    },
    {
        "position": "Cooks Assistant",
        "id": "1l884JenUPWtp89H7iiJ"
    },
    {
        "position": "Legal Adviser",
        "id": "1oY1BFoXgM6cFiVDwIGE"
    },
    {
        "position": "Art Director ",
        "id": "1sq2BqjeN6ojXlK6xWPc"
    },
    {
        "position": "Sales Director",
        "id": "1v784kwrNaX5zUdLqeLr"
    },
    {
        "position": "Audit Associate",
        "id": "20lgm6M55DZrlmA9yVaQ"
    },
    {
        "position": "Network Analyst",
        "id": "23I8vdoG4GUUd3aDWtZ1"
    },
    {
        "position": "Truck Driver",
        "id": "29yhF028RIyzToL2Aa9M"
    },
    {
        "position": "Nanny",
        "id": "2ACat0kmqqX5PQi83UC1"
    },
    {
        "position": "Retail Executive",
        "id": "2DrcsdJqLazR9P1VNf1f"
    },
    {
        "position": "Executive Housekeeper",
        "id": "2PxozsBVtqDuxe5irk7j"
    },
    {
        "position": "Research Analyst",
        "id": "2QMiVG6wjRmhwOnxzWXe"
    },
    {
        "position": "Writer",
        "id": "2TsqtHX9YMWgUMFQH6k6"
    },
    {
        "position": "Application Consultant",
        "id": "2WYQcbfmzSHstitAoJsK"
    },
    {
        "position": "Logistics Manager",
        "id": "2aUKH4ZSgRaW8GyGD6W4"
    },
    {
        "position": "Art Teacher",
        "id": "2atf0snx7VKtFH6MNA7W"
    },
    {
        "position": "Maintenance Officer",
        "id": "2gGVFBUqu7T5n7WYuQd2"
    },
    {
        "position": "Driving Instructor",
        "id": "2iJvYKNTxhTYtlBkMMG7"
    },
    {
        "position": "Design Engineer",
        "id": "2j9MJ05b67nsNjItQptY"
    },
    {
        "position": "Radiologist",
        "id": "2nuHcNuNsb1jLWPDAtP8"
    },
    {
        "position": "Porter",
        "id": "2r5mYmpPHkbyJfRnjRI0"
    },
    {
        "position": "Taxation Accountant",
        "id": "2s2CaHBZ1tXWLM5Vm0z0"
    },
    {
        "position": "Chef de Partie",
        "id": "2slR9x6fbQxv84X4v6fU"
    },
    {
        "position": "Creative Director   ",
        "id": "2uU4rBZH0omg3fbQcCuN"
    },
    {
        "position": "Payroll Officer",
        "id": "2yFjc6ch11XrQ3R68sx7"
    },
    {
        "position": "Developer",
        "id": "39pePaE9OQaTqeBjqsiF"
    },
    {
        "position": "Sales Manager",
        "id": "3Gq9sbpjWIDxGioPvk5r"
    },
    {
        "position": "Site Administrator",
        "id": "3GtOgRuDn4ojtY55io56"
    },
    {
        "position": "Computer Engineer",
        "id": "3Jq9avoQE68BQDSsPRx4"
    },
    {
        "position": "Sales Associate",
        "id": "3SCFxXqn56jNNKTzHEhX"
    },
    {
        "position": "Clinic Assistant",
        "id": "3WdI1lmjC5fOMvIz9vZO"
    },
    {
        "position": "Communications Manager",
        "id": "3eX1eHTAH9gcMlat3VYz"
    },
    {
        "position": "Planning Engineer",
        "id": "3iJcuIiXTyVgdd2HR39H"
    },
    {
        "position": "Coordinator ",
        "id": "3s1h16sskwH3K6yZXCDh"
    },
    {
        "position": "Quality Assurance Analyst",
        "id": "3uTi6OdS4LTgE0vgWoPE"
    },
    {
        "position": "Commissioning Engineer",
        "id": "3vP0v8mDCFjdbYKShKKf"
    },
    {
        "position": "Risk Analyst ",
        "id": "3xMw9xs46gihT5zR6WrE"
    },
    {
        "position": "Debt Collector ",
        "id": "43N08hrbgWTalR7iTfRx"
    },
    {
        "position": "Human Resources Executive",
        "id": "4D7biOWsUzhh9KAWrrWU"
    },
    {
        "position": "Creative Designer",
        "id": "4IaGKnygp6VTDmpZyWxV"
    },
    {
        "position": "Assistant Property Manager",
        "id": "4QBr4ELBKBN4qqTlaTFy"
    },
    {
        "position": "Case Manager ",
        "id": "4Y0FL2AYnQoOIj6f3iIw"
    },
    {
        "position": "Land Surveyor",
        "id": "4aLo8vt60ivmj7iUbfjC"
    },
    {
        "position": "Journalist ",
        "id": "4aQlfLCwgJc7UgBgc6qk"
    },
    {
        "position": "Paramedic",
        "id": "4cELOJKH8RjpOEJNckwg"
    },
    {
        "position": "Reporting Analyst",
        "id": "4lOtSHQ3BM6AlCxaZ2Rb"
    },
    {
        "position": "Company Driver",
        "id": "4qaGK9IUi2h15y8CbdH1"
    },
    {
        "position": "Software Development Manager",
        "id": "4z6TVxMuMwcRDqH9OwvJ"
    },
    {
        "position": "Credit Analyst",
        "id": "51KwXsEPtFNv61mqLUUx"
    },
    {
        "position": "Logistics Executive",
        "id": "52wIQsn8C1tYR01YPk4k"
    },
    {
        "position": "Receptionist",
        "id": "53eH74VNTCP1pyMBeHwx"
    },
    {
        "position": "Boutique Assistant",
        "id": "56fDK8ncTZSGRKGeNV2a"
    },
    {
        "position": "Chemist",
        "id": "57bim1fYYg1sQiN7sghZ"
    },
    {
        "position": "Project Assistant",
        "id": "5KLThP4YcB7wIhpQKYfd"
    },
    {
        "position": "Electrical Design Engineer",
        "id": "5ZP0KMNAIaUi5blALPET"
    },
    {
        "position": "Chief Operating Officer ",
        "id": "5ZaWu7Mse9eJEqx4iCs2"
    },
    {
        "position": "Computer Numerical Control Machinist",
        "id": "5c6Vwt4JQjY8okPXeuSs"
    },
    {
        "position": "Boilermaker",
        "id": "5fHVmPso2myMpCac1cba"
    },
    {
        "position": "Chinese Teacher",
        "id": "5gvJJa9spzpSIe9YDdlC"
    },
    {
        "position": "Product Designer",
        "id": "5l5XKsol3ajfBj3pGsp8"
    },
    {
        "position": "Nurse",
        "id": "5tK19b5OqvKzM6RC8gXW"
    },
    {
        "position": "Applications Manager",
        "id": "5v27CYmX495uHJHkuLB0"
    },
    {
        "position": "Corporate Communications Executive",
        "id": "5wAzbVYAltUAhs62Q5D2"
    },
    {
        "position": "Beautician",
        "id": "5yF68VKynw07aJdZR6RJ"
    },
    {
        "position": "Production Manager",
        "id": "626tiHKnYF2AUpOaTQwu"
    },
    {
        "position": "Product Manager",
        "id": "65sZxgMzw2AR97ODdlkj"
    },
    {
        "position": "Sports Trainer",
        "id": "6F3FUTtUQOnfoKlvCGLR"
    },
    {
        "position": "Corporate Sales Manager",
        "id": "6GVqYKUUtKKcLax014pn"
    },
    {
        "position": "Phlebotomist",
        "id": "6J2qt4dy9Xcdj7UHU3W4"
    },
    {
        "position": "Accounting Officer",
        "id": "6NmT5NW9JmLIV68kmfPJ"
    },
    {
        "position": "Assistant Restaurant Manager",
        "id": "6UZtw5XiaJAzwhZp28di"
    },
    {
        "position": "Accounts Receivable Officer",
        "id": "6Ye92gRI6EvInRWhgVrJ"
    },
    {
        "position": "Customer Service Executive  ",
        "id": "6hswNcD32gHSyHgCaxH6"
    },
    {
        "position": "Purchasing Clerk",
        "id": "6i2GmrelcKgvlAiD5193"
    },
    {
        "position": "Public Relations Executive",
        "id": "6jFGXncz32oJxsWnMtql"
    },
    {
        "position": "Executive Officer",
        "id": "6lW42fvuPI0NSypYNDIh"
    },
    {
        "position": "Sales Coordinator",
        "id": "6oC5t8HCvRwq27biWfPU"
    },
    {
        "position": "Product Engineer",
        "id": "6p36jJmsOQYdty4lyRCi"
    },
    {
        "position": "Customer Service Supervisor    ",
        "id": "6uEd5kPF4OsSGOpZjVHt"
    },
    {
        "position": "Business Development Assistant ",
        "id": "6xiHJafp1IoWl2qSTMzr"
    },
    {
        "position": "Process Engineer",
        "id": "71hTWORLq3bsc7c6EnJb"
    },
    {
        "position": "Retail Store Manager",
        "id": "73XLGaOCmBN1iJl7iLG2"
    },
    {
        "position": "Field Service Engineer",
        "id": "7VAh0rkXk0zYxr6TGV0d"
    },
    {
        "position": "Network Engineer",
        "id": "7a835ucsbrrCCH9SHKnN"
    },
    {
        "position": "Support Consultant",
        "id": "7aJjIKrTGcf75e6sNMnW"
    },
    {
        "position": "Development Engineer",
        "id": "7bTM5miNgPGe9T1iFUm0"
    },
    {
        "position": "Hardware Engineer",
        "id": "7cQyElyNWvqwmbxkVocP"
    },
    {
        "position": "Shipping Executive",
        "id": "7d6zY6zw4hjQTlVLzz2R"
    },
    {
        "position": "Quality Analyst",
        "id": "7g07Eo6fhBOPejxBr2zl"
    },
    {
        "position": "Assistant Warehouse Manager",
        "id": "7lo0QcmhD9fMM40Au9qS"
    },
    {
        "position": "Maintenance Manager",
        "id": "7lthcdFKG4qU7zx8irjd"
    },
    {
        "position": "Inventory Assistant",
        "id": "7muyVmMML902skIzbItd"
    },
    {
        "position": "Floor Supervisor",
        "id": "7vuDaCFUFqE5freMYYo8"
    },
    {
        "position": "Product Marketing Manager",
        "id": "7ziUurYQCJKMmsYAuKAh"
    },
    {
        "position": "Web Developer",
        "id": "8AEJ6AjWW4ZSSBOYmImB"
    },
    {
        "position": "Purchasing Supervisor",
        "id": "8HAAeLaPJXLHoOwKXm4n"
    },
    {
        "position": "Events Coordinator",
        "id": "8HRkEaSEBodItYbSJPDY"
    },
    {
        "position": "Production Technician",
        "id": "8NfOUojW7tGBlaeFvN8e"
    },
    {
        "position": "Manager",
        "id": "8RJNFYuL4VnaT8wsB6Qm"
    },
    {
        "position": "Agronomist",
        "id": "8jUTbAmzCTqCNXP3bTkk"
    },
    {
        "position": "IT Project Manager",
        "id": "8jgqNFeUpCu9byBNHyW7"
    },
    {
        "position": "Massage Therapist",
        "id": "8pJWPoSPOTt7IeK8ntvA"
    },
    {
        "position": "Real Estate Agent",
        "id": "8pQfYTI3PNp7LogwJpAt"
    },
    {
        "position": "Clinical Psychologist",
        "id": "8xsZwFwYOqpFnnA3askQ"
    },
    {
        "position": "Accounts Clerk",
        "id": "90I7ANoqyVA9luS27UPe"
    },
    {
        "position": "Graphic Designer",
        "id": "94oYN2NabAMFdP63e6Ho"
    },
    {
        "position": "Java Developer",
        "id": "9CXuzEkZCKHPBJH1rQUK"
    },
    {
        "position": "Operations Analyst",
        "id": "9NRHXErNgM9Oa4n6UeOI"
    },
    {
        "position": "Business Consultant",
        "id": "9RP722bB82ZgZ65feT97"
    },
    {
        "position": "Payroll Clerk",
        "id": "9kLGJpJdkA4p5tuINv9n"
    },
    {
        "position": "Assistant Supervisor",
        "id": "9n3pPGLATi2o1637RgR3"
    },
    {
        "position": "Restaurant Manager",
        "id": "9rF4HKjRCW1ssBLRls7K"
    },
    {
        "position": "Content Writer  ",
        "id": "9t7IpO4nR12suNb68nGq"
    },
    {
        "position": "Network and Security Engineer",
        "id": "9zq31pZSCm9aB3u1z5wr"
    },
    {
        "position": "Planning Manager",
        "id": "A5urbLRjslWb2Cc77bVN"
    },
    {
        "position": "Technical Analyst",
        "id": "A8YUIWIhvKpjwc6HbrXT"
    },
    {
        "position": "Brand Ambassador",
        "id": "AD5NNtO1DDfXzl0ei6yW"
    },
    {
        "position": "Sales Engineer",
        "id": "AFRbqOfSGUjgmoHtM9OX"
    },
    {
        "position": "Web Designer",
        "id": "AJT56QrKZuuCX8ebUD02"
    },
    {
        "position": "Scaffolder",
        "id": "AKcWKNcNrvrJciBpCF6K"
    },
    {
        "position": "Physiotherapist",
        "id": "AWJkiN2cvvQX4EQqRWMt"
    },
    {
        "position": "Assistant Finance Manager",
        "id": "AXXnTB7X13aaZw1MK2sM"
    },
    {
        "position": "Community Development Officer ",
        "id": "AZvyY242uWsMaBlS5Xc6"
    },
    {
        "position": "Computer Numerical Control Programmer",
        "id": "Ajgtiw8qyhXztQf1Yesy"
    },
    {
        "position": "Field Engineer",
        "id": "AplMn2TfoPJfcAXAA6Rl"
    },
    {
        "position": "Application Support Specialist ",
        "id": "AprTCUjQhRFfRRQKFKn8"
    },
    {
        "position": "Office Assistant  ",
        "id": "AqXEFciuURr5WqqqE7SV"
    },
    {
        "position": "Store Supervisor",
        "id": "B2O7o9vnDlNVEL7mvblF"
    },
    {
        "position": "Service Desk Analyst",
        "id": "B8Ie7DmGSF6eppbBvR8V"
    },
    {
        "position": "Revenue Manager",
        "id": "BBHxXCabvqOQ1B5KuqKY"
    },
    {
        "position": "Project Designer",
        "id": "BKlLpZDdX2ox2fkm4HlS"
    },
    {
        "position": "Contract Executive",
        "id": "BUuP3aJFrUPp8zmzAc6e"
    },
    {
        "position": "Tour Operator",
        "id": "BbICrwsy0bs0GZenLYeY"
    },
    {
        "position": "Microbiologist",
        "id": "BcCSvIfyoJr4TxUjr3R0"
    },
    {
        "position": "Researcher",
        "id": "BjIBptPavApFWh260YzV"
    },
    {
        "position": "Packer",
        "id": "Bzk8TGGW0kbrJpNBqxFs"
    },
    {
        "position": "Service Adviser",
        "id": "CBBKnfvJlWJXjz1jK9uC"
    },
    {
        "position": "Customer Service Assistant",
        "id": "CEOo7o71cRwa1FMB6NO0"
    },
    {
        "position": "Machine Operator",
        "id": "CbFYwJ3gRoAhgtHBbSQC"
    },
    {
        "position": "Dietitian",
        "id": "CbOdDKv0L19lha4us2Zg"
    },
    {
        "position": "Coxswain",
        "id": "Cbc377f7lSZUcxiaMx4u"
    },
    {
        "position": "Cashier",
        "id": "CxKa45BiMaMnFPyewLKO"
    },
    {
        "position": "Systems Analyst",
        "id": "D4NKYAPPykEevynXYtLd"
    },
    {
        "position": "Relationship Manager",
        "id": "D6q1AMqzJMelDysQtqT1"
    },
    {
        "position": "Guidance Counsellor",
        "id": "DRtfcWlsDeUuoVVkcXV8"
    },
    {
        "position": "Personal Carer",
        "id": "DRu574Vm28kfZRLwmFoB"
    },
    {
        "position": "Sales and Marketing Executive",
        "id": "DTGVJGSWXrSryPFhuz3F"
    },
    {
        "position": "Maintenance Technician",
        "id": "DXVBWYvCwQErymYAxB8N"
    },
    {
        "position": "Interpreter ",
        "id": "Db5iXjdxTFGdE1HTUPTy"
    },
    {
        "position": "Visual Merchandiser",
        "id": "De6m5eW0KDPDOz67UIAs"
    },
    {
        "position": "Enterprise Resource Planning Consultant ",
        "id": "Dh23ZwxCvAsHEbNoWVNK"
    },
    {
        "position": "Demand Planner",
        "id": "Dhj4AQxuwKK0VMBanMUA"
    },
    {
        "position": "Assistant Teacher",
        "id": "Disu6Pwhp7eJ6WKXaIY3"
    },
    {
        "position": "Personal Banker ",
        "id": "DsUaAWtCIzMMfyWETVMU"
    },
    {
        "position": "Marketing Manager",
        "id": "DzorKgWcwXUFHQ1MJQ4i"
    },
    {
        "position": "Quality Officer",
        "id": "E3FicqwPaN19p3Lf4leH"
    },
    {
        "position": "Operations Manager",
        "id": "EEoMk7RFCEbE8yG4gCkY"
    },
    {
        "position": "Electrician",
        "id": "EJ4gHobKih9imz4W5QtL"
    },
    {
        "position": "Nutritionist",
        "id": "ELNkcvUXGFxy9DpBVpLq"
    },
    {
        "position": "Assistant Relationship Manager",
        "id": "EPW2aaIvVdNBXqlTfIkM"
    },
    {
        "position": "Production Assistant",
        "id": "EinfjXcmYG8BJJDj77BQ"
    },
    {
        "position": "Information Technology Support Analyst",
        "id": "EoToxNfGB89ob1Q8xk0T"
    },
    {
        "position": "Fashion Designer",
        "id": "EpjxUGOXt1szuGPEO35T"
    },
    {
        "position": "Call Center Executive ",
        "id": "Eq0I1hGaOyCX1xvA7b9M"
    },
    {
        "position": "Automation Engineer",
        "id": "EqbRZ4ISVkviL7RJi02F"
    },
    {
        "position": "Compliance Analyst",
        "id": "ErF8WrbBjUgJZvym0l6I"
    },
    {
        "position": "Group Leader",
        "id": "Erkqi09VCDQhq09YJI9Y"
    },
    {
        "position": "Network Technician",
        "id": "ErzHYO54BpBRAet2w75G"
    },
    {
        "position": "Network and Systems Engineer",
        "id": "EwiwCqd5mpyAI5H3sy5B"
    },
    {
        "position": "Content Editor  ",
        "id": "FCzZzNZKxcLLGAJp069a"
    },
    {
        "position": "Security Consultant",
        "id": "FODRKIHwLQWHsesoPezI"
    },
    {
        "position": "iOS Developer",
        "id": "FQ3j7TNkpeWFqA5pGImM"
    },
    {
        "position": "Customer Support Officer  ",
        "id": "FQ9e4IoSFLxnISKh0ndL"
    },
    {
        "position": "Food and Beverage Manager",
        "id": "FTAPG4HmubPIxc6nAR1M"
    },
    {
        "position": "Air Traffic Controller",
        "id": "Fg94QTEiwtyIy9zbZPxF"
    },
    {
        "position": "Medical Representative",
        "id": "Fjq3aDTYX8kjds24Ek2p"
    },
    {
        "position": "Civil Engineer",
        "id": "FpOBiwXjNWqiNkLHdGva"
    },
    {
        "position": "Finance Clerk",
        "id": "FvDzK1SeLMpAWHL91vV7"
    },
    {
        "position": "Beauty Adviser",
        "id": "FvXsns1glKoHWi9gObDu"
    },
    {
        "position": "Psychologist",
        "id": "G6Y5txdJqkXXAcoBW1tZ"
    },
    {
        "position": "Sales and Marketing Manager",
        "id": "G6y7U0XL1iZiPEkseep6"
    },
    {
        "position": "Taxation Consultant",
        "id": "G7JHXTxkozgQYo2dl8bx"
    },
    {
        "position": "Training Officer",
        "id": "GC6IT4N6qt8oikVJrYNk"
    },
    {
        "position": "Travel Agent",
        "id": "GFjve0rlLtXN1R7rdLKl"
    },
    {
        "position": "Full Stack Developer",
        "id": "GH886zGxAI36jI17QsH7"
    },
    {
        "position": "Data Analyst",
        "id": "GKIH8Ap79qUmF1ZbpJ81"
    },
    {
        "id": "GKxXtBe8bFFY6wmIfwrS"
    },
    {
        "position": "Guest Services Supervisor",
        "id": "GM97FYWbnIUIYyjqBUMI"
    },
    {
        "position": "Personal Assistant",
        "id": "GNkUQm02PM0MJAt9JREc"
    },
    {
        "position": "Animator",
        "id": "GXCWVV29YokJGoAgMWXg"
    },
    {
        "position": "Supply Chain Manager",
        "id": "Ge5MmAc8ANIgq8ok3C91"
    },
    {
        "position": "Marketing Executive",
        "id": "GxTkZl89ax4VQ1V1SHxt"
    },
    {
        "position": "Chief Financial Officer",
        "id": "HZGahGdjpLeO75aSpcd5"
    },
    {
        "position": "Analyst Programmer",
        "id": "HamvgdC9OjQbvB7Qjupa"
    },
    {
        "position": "Safety Engineer",
        "id": "HqP6Ss2pxkSkbZZ1liKK"
    },
    {
        "position": "Engineering Manager",
        "id": "HsGsoQC1axRqJtwp11qe"
    },
    {
        "position": "Technical Consultant",
        "id": "HsoEY810hcBuCxwGzESt"
    },
    {
        "position": "Technical Writer",
        "id": "HzAUMAhCW83mvtcy72jc"
    },
    {
        "position": "Electrical Supervisor",
        "id": "I8hRAhHrA2Z9nBkENEc6"
    },
    {
        "position": "Information Technology Trainee",
        "id": "IJCD5hbe9sBaFiB4ByLI"
    },
    {
        "position": "Architectural Assistant ",
        "id": "INi1Wq5m174N7l5yfMo2"
    },
    {
        "position": "Caterer",
        "id": "IVjk6Y18eylmQ0SJwNas"
    },
    {
        "position": "Data Scientist",
        "id": "Ice0ZwzUzHCbAIGHqG8y"
    },
    {
        "position": "National Sales Manager",
        "id": "IhjYtIxEFkoeKQeRfvVT"
    },
    {
        "position": "Mechanic",
        "id": "IjVPIncFHeKegwpPJH97"
    },
    {
        "position": "Teaching Aide",
        "id": "IoeJ0BN2FlTOnqDU1Hkv"
    },
    {
        "position": "Infrastructure Engineer",
        "id": "IrM6LHHuW1R7IwcIMA0E"
    },
    {
        "position": "Information Technology Executive",
        "id": "IsUcARlGRjshAgJu6TlI"
    },
    {
        "position": "Secondary School Teacher",
        "id": "ItQ7bzHKwdnq9vgC6QWA"
    },
    {
        "position": "Clinician ",
        "id": "IuTnek5LBkiwNP4LaU2r"
    },
    {
        "position": "Network Support Engineer",
        "id": "Iy5ofrcgrTgtjdwxiZcO"
    },
    {
        "position": "Branch Manager",
        "id": "J1Wg7CWoQRaV2SmWKI3y"
    },
    {
        "position": "Leasing Manager",
        "id": "J1qYMhhHwlmco4mKlbrZ"
    },
    {
        "position": "Supply Planner",
        "id": "JK8AHYVzdXgcb4ZKywwQ"
    },
    {
        "position": "Operations Engineer",
        "id": "JRrNsWcvwRLeDFa0Y8eG"
    },
    {
        "position": "Product Specialist",
        "id": "JV1k1v6KuLRcDBdSwsHt"
    },
    {
        "position": "Radio Frequency Engineer",
        "id": "JZgyD06ijSoutDRNzLsa"
    },
    {
        "position": "Production Operator",
        "id": "JdVBpmSxpp5gPmKQAQPN"
    },
    {
        "position": "Lecturer",
        "id": "JjNmmx1X3yhyC93Vxr06"
    },
    {
        "position": "Surveyor",
        "id": "JoPuMvdtndovkkIVAFyk"
    },
    {
        "position": "Advertising Manager",
        "id": "JtefpAGv6SSkGfinsrVj"
    },
    {
        "position": "Recruitment Manager",
        "id": "JwXqlUbR3EcC2slyrDxE"
    },
    {
        "position": "Accounts Officer",
        "id": "K0EHuv4VBCSL4GmcV2XK"
    },
    {
        "position": "Quantity Surveyor",
        "id": "KEkYcVj9KCTkElS67YEq"
    },
    {
        "position": "Logistics Coordinator",
        "id": "KFfxE1dwnzRyvOvAs5oF"
    },
    {
        "position": "Accounting and Financial Manager",
        "id": "KFyJMyEqfxro1hg64Kjq"
    },
    {
        "position": "Baker",
        "id": "KJ2dH68UIYIUDW4nhmKs"
    },
    {
        "position": "Quality Assurance Manager",
        "id": "KPnKnfJqeLQK32R4gMW1"
    },
    {
        "position": "Facilities Engineer",
        "id": "KPw92Qj7vYSmbQNmiCnP"
    },
    {
        "position": "Doctor",
        "id": "KQpXnDUkIdqkHpOuc8XG"
    },
    {
        "position": "Branch Supervisor",
        "id": "KQyIKUT7RwUvMY0lwx6f"
    },
    {
        "position": "Health and Safety Officer ",
        "id": "KVB10kWyOWeMHUsmcW3a"
    },
    {
        "position": "Operations Officer ",
        "id": "KYugug8DYnecloUJTyGc"
    },
    {
        "position": "Automotive Technician",
        "id": "KZvcm1gvuKPIWnyCfhFx"
    },
    {
        "position": "Production Supervisor",
        "id": "KalselmFaLehNT11MZIP"
    },
    {
        "position": "Physician",
        "id": "KaviCyaCBsYBbQXvnnmC"
    },
    {
        "position": "Production Engineer",
        "id": "Kfc1w4XAkZlJmaPkqlkr"
    },
    {
        "position": "Food and Beverage Supervisor",
        "id": "KjcI7Nx5KlrWhcLRAmIL"
    },
    {
        "position": "Construction Engineer",
        "id": "KjrclqdK3iVpyPH25mCg"
    },
    {
        "position": "Illustrator",
        "id": "KptpIM8QfmIx1hOC96iK"
    },
    {
        "position": "Project Coordinator",
        "id": "KykhoTJfUXjGEs5rsGjh"
    },
    {
        "position": "Sales Consultant",
        "id": "L3MzFYs7kbb3dewpAalm"
    },
    {
        "position": "Host",
        "id": "L7O8rQ2UZ75HxElplwWL"
    },
    {
        "position": "Helpdesk Specialist",
        "id": "LD8aw4pTX8fQJAIsxsDn"
    },
    {
        "position": "Project Engineer",
        "id": "LH6Vlxo0p71dGRk4uOKI"
    },
    {
        "position": "Electronics Technician",
        "id": "LNGhzsUNS2gfU9XPK833"
    },
    {
        "position": "Forklift Driver",
        "id": "LRLM75XqI1nVLytBv6Sv"
    },
    {
        "position": "Fitter",
        "id": "LYLpdsLYQ8lkuEXF8MVx"
    },
    {
        "position": "Maintenance Assistant",
        "id": "Liz7eC5ZvzMHwdhzTK2H"
    },
    {
        "position": "Architectural Designer ",
        "id": "LyKptsQRDBgkEOarUaK6"
    },
    {
        "position": "Project Accountant",
        "id": "M26A3VAsCNMqMqtcaq9N"
    },
    {
        "position": "Hotel Supervisor",
        "id": "M7w9HzFS0wau4eSzWmmM"
    },
    {
        "position": "Conveyancer",
        "id": "M7yYgVOt7JpQ33moFhYo"
    },
    {
        "position": "Product Development Engineer",
        "id": "ML1bFZQHCFjcY3JgBoNZ"
    },
    {
        "position": "Internal Auditor",
        "id": "MLzOT3UnXq8Gd1UgnY03"
    },
    {
        "position": "Customer Relations Officer ",
        "id": "MPXESqd5k7AKIknVAyoT"
    },
    {
        "position": "Hairdresser",
        "id": "Megq4JCMuCBUucRbJRzY"
    },
    {
        "position": "Tour Guide",
        "id": "MuU2vVRJvC17nSGDLBR2"
    },
    {
        "position": "Cyber Security Analyst",
        "id": "N1yDNK0yPU7fy3rJJ4vA"
    },
    {
        "position": "Maintenance Electrician",
        "id": "NC1xCHWYVgpMnIkA1whQ"
    },
    {
        "position": "Bank Teller",
        "id": "NYYM3OjMHGkfmNllVb1V"
    },
    {
        "position": "Operations Administrator ",
        "id": "NcWkBiqQzOmTIRLeCHsb"
    },
    {
        "position": "Systems Administrator",
        "id": "Niv86LHz9Jpq1WemIpug"
    },
    {
        "position": "Sales and Marketing Officer",
        "id": "NovVUdVlRK457TNuhDnG"
    },
    {
        "position": "Clinical Coder",
        "id": "NsHRv72aSaPPCqvy9OzK"
    },
    {
        "position": "Software Development Engineer",
        "id": "NxNRRf82bBXBRpFzyUcb"
    },
    {
        "position": "Warehouse Assistant",
        "id": "O0asRqcL3ZgdGqmmHSPi"
    },
    {
        "position": "Information Technology Specialist",
        "id": "OAqqeRQOIxlQbrcdJyns"
    },
    {
        "position": "IT Manager",
        "id": "ODrlk28DOFuflsv4TIiS"
    },
    {
        "position": "Database Administrator",
        "id": "OHSADcKJLxbjZihXlkLe"
    },
    {
        "position": "Inspector ",
        "id": "OJH81cVxTjyiZ959e1Yq"
    },
    {
        "position": "Fitness Trainer",
        "id": "OLvdJ6CzMO4BRla5LS72"
    },
    {
        "position": "Midwife",
        "id": "OY9sUt2lwIAS1xF6yjOQ"
    },
    {
        "position": "Estimator",
        "id": "OamZnzp0P4QhMEvTg8xA"
    },
    {
        "position": "Human Resources Manager",
        "id": "OeMkUFX6pawn3lCq6rkD"
    },
    {
        "position": "Sales Specialist",
        "id": "Oi0NXtFxPGBL448nIpvT"
    },
    {
        "position": "Risk Manager ",
        "id": "OlViPfEWaZMfXQMIjDKT"
    },
    {
        "position": "Logistics Assistant",
        "id": "Olx91sRdXjCII5k3U7co"
    },
    {
        "position": "Delivery Manager",
        "id": "On7Bd6340fCvx8aHzlSM"
    },
    {
        "position": "Information Technology Supervisor",
        "id": "OnMkeJny0Eh2aRVzqeM0"
    },
    {
        "position": "Customer Care Specialist  ",
        "id": "OrnPON6wEooYcZMcNyus"
    },
    {
        "position": "Office Clerk  ",
        "id": "Owkv7z5F9q7IN6hOxqV1"
    },
    {
        "position": "Telecommunications Engineer",
        "id": "P2YytkQRJEP2LFQt9OjW"
    },
    {
        "position": "Senior Associate",
        "id": "P2tyran2cN5tHjaw3TNc"
    },
    {
        "position": "Channel Manager",
        "id": "P3lsjhCrVmWi1UTQyEje"
    },
    {
        "position": "Medical Scientist",
        "id": "P5Iyilu7CMqn8q7ji6Tc"
    },
    {
        "position": "Property Developer",
        "id": "PHHchte0RTNALedKfOjg"
    },
    {
        "position": "Engineer",
        "id": "PK0lN3FlTE42FgInUy6r"
    },
    {
        "position": "Operations Supervisor",
        "id": "POvGxqw9Vedhhwnxpuzo"
    },
    {
        "position": "Motion Graphics Designer",
        "id": "PQLOpwfqzLel79RZD0zM"
    },
    {
        "position": "Secretary",
        "id": "PUHdGFKq5PzCX7LI39Xu"
    },
    {
        "position": "Talent Acquisition Specialist",
        "id": "PVs07mYqauueRmjzTdo7"
    },
    {
        "position": "Front Office Manager",
        "id": "PVtGv2D1fxWMBHm7RSbS"
    },
    {
        "position": "Laboratory Assistant",
        "id": "PhPXRydwMoGIbrvD78i4"
    },
    {
        "position": "Legal Officer",
        "id": "Pmbjmb3o5SqTtaXdBiAR"
    },
    {
        "position": "Economist ",
        "id": "PqmYxCZIcJ38mK44I8K8"
    },
    {
        "position": "Assistant Audit Manager",
        "id": "Psev3RrBm6wvc8NIeFSG"
    },
    {
        "position": "Customer Care Consultant ",
        "id": "PyDJ68tTvBwRRgJrHpvL"
    },
    {
        "position": "Account Coordinator",
        "id": "Q9jbKhzJKuOafasUb2Mb"
    },
    {
        "position": "Buyers Assistant",
        "id": "QBu4gm4FfaO3LJ7wf1MU"
    },
    {
        "position": "Quality Assurance Executive",
        "id": "QDiI70Cq3mCm6viwbNqV"
    },
    {
        "position": "Information Technology Support Specialist",
        "id": "QNRsNEtvBJzNDm0fhjjP"
    },
    {
        "position": "Education Consultant",
        "id": "QU4PYkysqSY7NpM4WJ16"
    },
    {
        "position": "Information Technology Administrator",
        "id": "Qe4dvkERoL60WtTqflW1"
    },
    {
        "position": "Auditor",
        "id": "QnUr5ocbqMCMct3oVVkt"
    },
    {
        "position": "Finance Director",
        "id": "QqLzambg4vD48MO5F8D8"
    },
    {
        "position": "Financial Controller",
        "id": "QsB82dmGuUPNHEKnlNrM"
    },
    {
        "position": "Conveyancing Clerk",
        "id": "QveGmSKokhKLLlZxGOYG"
    },
    {
        "position": "Operations Executive ",
        "id": "Qw3Q2XP6IFbSSySNPBL2"
    },
    {
        "position": "Statistician",
        "id": "QxHTUY6ttS80A322AL27"
    },
    {
        "position": "Document Controller",
        "id": "QxUau46N1k5Xrre65gGl"
    },
    {
        "position": "Sales Representative",
        "id": "RV76Sqc6uAFdVLQFwCJI"
    },
    {
        "position": "Front Office Assistant",
        "id": "RYy4qC9UmvzU3WLQSF2p"
    },
    {
        "position": "Retail Pharmacist",
        "id": "Rh9oIOOx0t8g78D02N8p"
    },
    {
        "position": "User Experience Designer",
        "id": "RoB0mIgAVoLXbKLm5jsL"
    },
    {
        "position": "Program Manager",
        "id": "RoKjpdcqSXVUD4NYpPfg"
    },
    {
        "position": "Legal Manager",
        "id": "RrYYJtbnoj1ZgoSG1nvb"
    },
    {
        "position": "Development Manager",
        "id": "RrrgxbL5p3xOIbMAtCd4"
    },
    {
        "position": "Site Supervisor",
        "id": "S7HmsjNz1QOog0FqgwJN"
    },
    {
        "position": "Compliance Manager",
        "id": "SAzhGk1jhnnBJpYPXAa2"
    },
    {
        "position": "Credit Assistant ",
        "id": "SCLPObXqH170afh9kRWt"
    },
    {
        "position": "Project Director ",
        "id": "SE0lZPX4OEwvHbXfZmY0"
    },
    {
        "position": "Procurement Engineer",
        "id": "SI48i98Tf89rCJ2sgoql"
    },
    {
        "position": "Fabricator",
        "id": "SKm3T7N893frjwIRoVyH"
    },
    {
        "position": "Management Accountant",
        "id": "SLJxo2JHd5SbWYHnnb9T"
    },
    {
        "position": "Geologist",
        "id": "SOrwYsd4iczEPCGhMqdS"
    },
    {
        "position": "Landscaper",
        "id": "SPxazTO8CQZKAB705O2s"
    },
    {
        "position": "Promoter",
        "id": "SgdTo9jKin1C3bv2Ij5t"
    },
    {
        "position": "Chef",
        "id": "SlbX20EpkGIh1EpXvG0W"
    },
    {
        "position": "Demi Chef",
        "id": "SqpDIJlgJ8V9sCW3lmWu"
    },
    {
        "position": "Security Guard",
        "id": "SxJ9wCbnZmlxCubsM6IK"
    },
    {
        "position": "Air Conditioning Technician",
        "id": "T06ZraTPQG4AwIvhqGQj"
    },
    {
        "position": "Interior Designer",
        "id": "TAO6E9rXV6aBl7LuvK3S"
    },
    {
        "position": "Assistant Front Office Manager",
        "id": "TBEHU2l7zI07PuYBX67P"
    },
    {
        "position": "Business Controller",
        "id": "TF7rQwkYobjyz8mPlYLa"
    },
    {
        "position": "Business Development Analyst",
        "id": "THA1J6fSbmnAZk4AAAf5"
    },
    {
        "position": "Assistant Accounts Officer",
        "id": "TKKMXGP7Swk8fwbvxXFE"
    },
    {
        "position": "Medical Officer",
        "id": "TL7E8Os6RLKAI8nBoxzv"
    },
    {
        "position": "Customer Service Representative    ",
        "id": "TVovNwk5XsWXIqrW62C1"
    },
    {
        "position": "Desktop Engineer",
        "id": "TeEBivOUjFEDfGoWNfnL"
    },
    {
        "position": "Security Manager",
        "id": "TfLp67sTY3VMVgjP0rJv"
    },
    {
        "position": "Customs Broker",
        "id": "TjmiPzpDIuBLUOt5pb4q"
    },
    {
        "position": "Programmer",
        "id": "Tql7AmZAR0Czy8ylSv2b"
    },
    {
        "position": "Inside Sales Manager",
        "id": "TrQICepenBar7EJ2HoNY"
    },
    {
        "position": "Audiologist",
        "id": "Tx8mH28gtv3WnGqhIFRp"
    },
    {
        "position": "Sales Executive",
        "id": "U3Pl3lvssBnZgJRERweJ"
    },
    {
        "position": "Bar Manager",
        "id": "UF2Iwhsn9K7SVBQsbdKP"
    },
    {
        "position": "Network Operations Centre Engineer",
        "id": "ULj1XSEzjAn5HroypdBo"
    },
    {
        "position": "Computer Operator",
        "id": "UQanCHzjSL2NTqLGja68"
    },
    {
        "position": "Warehouse Supervisor",
        "id": "UU33EzZuZeqhHl4JEzu3"
    },
    {
        "position": "Treasury Executive",
        "id": "UXCnMtJilelo8boxfBtt"
    },
    {
        "position": "Information Technology Technical Support Role",
        "id": "UXcjpSQmOWqJEAhLWjU2"
    },
    {
        "position": "Contact Center Sales Representative ",
        "id": "UfWtzu6qpKtF3qxSOXvb"
    },
    {
        "position": "Site Coordinator",
        "id": "UfjSVADkfxxMjqGTInyW"
    },
    {
        "position": "Manicurist",
        "id": "UlNbC6Qti0Q7JBcH481I"
    },
    {
        "position": "Regional Manager",
        "id": "UnItm7jUWk8HrVeZpWLI"
    },
    {
        "position": "Video Editor",
        "id": "UtgpV1lBSrpyszMBNCrs"
    },
    {
        "position": "Healthcare Assistant",
        "id": "UyP0GgrJdd3UTRVF64W8"
    },
    {
        "position": "Mobile Application Developer",
        "id": "V0kVoEXDlk2TUPAXDT4z"
    },
    {
        "position": "Financial Planner ",
        "id": "V6GZQuEUycM11zrsl3p5"
    },
    {
        "position": "Records Officer",
        "id": "V97ba1muKRQGRYjhmlPw"
    },
    {
        "position": "Retail Sales Assistant",
        "id": "VE51hzj8tdYBuWDAs53K"
    },
    {
        "position": "Taxation Assistant",
        "id": "VFsmm3XLkJCTu3lcwHZ9"
    },
    {
        "position": "Actuary",
        "id": "VGw7mfidtOdr5jISX9DK"
    },
    {
        "position": "Chiropractor",
        "id": "Va4cjrqB2303G4qzYm2b"
    },
    {
        "position": "Project Consultant ",
        "id": "VaNkTvQa72p5omO8p2vy"
    },
    {
        "position": "Production Executive",
        "id": "Vd5IIziyH5UCykspuYG7"
    },
    {
        "position": "Makeup Artist",
        "id": "VuAG6WmvzG5y4DwHxmlV"
    },
    {
        "position": "Data Engineer",
        "id": "VyCKOYzx2nNuTu6maUYG"
    },
    {
        "position": "Machinist",
        "id": "VzF8SdoYmne5yD6mPCnW"
    },
    {
        "position": "Quality Control Technician",
        "id": "Vzm8SHC02SmLiWEyzjkh"
    },
    {
        "position": "Firefighter",
        "id": "W5OOrPmrW2aTwSTACk78"
    },
    {
        "position": "Technical Specialist",
        "id": "W7Xpe61RdX0Re0YWk2rT"
    },
    {
        "position": "Sales and Marketing Assistant",
        "id": "W9ZaA1dxjjrQRDNzJ84c"
    },
    {
        "position": "Financial Accountant",
        "id": "W9c18dyJO50qnyWxT8mn"
    },
    {
        "position": "Factory Worker",
        "id": "W9vCmrvC3sXGnQf5vQ5Q"
    },
    {
        "position": "Network Specialist",
        "id": "WFFTAH0VdhdHXlVuFJwH"
    },
    {
        "position": "Salesperson",
        "id": "WJY3T7SolBEobYWa1XT5"
    },
    {
        "position": "Consultant",
        "id": "WLvz5dzuOBmgVNgVlLnN"
    },
    {
        "position": "Surgeon",
        "id": "WNeOxl1lpjWsm67jxdpq"
    },
    {
        "position": "Human Resources Adviser",
        "id": "WQFmtymtshAz26zAQdQJ"
    },
    {
        "position": "Producer  ",
        "id": "WUTw82fix668Oa9TL2CV"
    },
    {
        "position": "Technician",
        "id": "WX2lxQF19aaO9FuL0Zno"
    },
    {
        "position": "Shift Manager",
        "id": "WXDbnrfEBchqu7s5Ah7a"
    },
    {
        "position": "Digital Marketing Specialist",
        "id": "WgBN1f7TZH1xbf4nt1fB"
    },
    {
        "position": "Foreperson",
        "id": "WiZJp3NTG8iCHLOxeFbF"
    },
    {
        "position": "Farm Manager",
        "id": "WrX3zQUNw68RmGBzL8x1"
    },
    {
        "position": "Bar Supervisor",
        "id": "WvxEqQcVP1QPwYvDNlD7"
    },
    {
        "position": "Project Supervisor ",
        "id": "WxfJjcuw9RqTnfZcWF2G"
    },
    {
        "position": "Guard",
        "id": "X2WvMRfx6iQ9xEqPSjkV"
    },
    {
        "position": "Assistant  Manager",
        "id": "X5gcuyjaAacOe6jrTf5R"
    },
    {
        "position": "Civil Supervisor ",
        "id": "X6CYt6Z8EtwaeRnTWA1v"
    },
    {
        "position": "Security Officer",
        "id": "XA03KnDT81KwpPYwFlID"
    },
    {
        "position": "Assistant Officer",
        "id": "XAV0wAOHCAe91p6hLgA1"
    },
    {
        "position": "Quality Supervisor",
        "id": "XER7ukKBiGX9vq1HzV9C"
    },
    {
        "position": "Bartender",
        "id": "XQNJJtPe4RLXaAVimvo1"
    },
    {
        "position": "Environmental Consultant ",
        "id": "XXeeuae15FXaEmzvvtgn"
    },
    {
        "position": "Logistics Specialist",
        "id": "XmrMVflY5OKFr2ik5LSv"
    },
    {
        "position": "Accounts Administrator",
        "id": "XxOY7OZffi8zkLnn5Jbt"
    },
    {
        "position": "Billing Clerk",
        "id": "Y2bdxMuz1uuwZXWXHA0N"
    },
    {
        "position": "Events Manager",
        "id": "YJwbXYypiPAX4dTyFlz5"
    },
    {
        "position": "Chemical Engineer",
        "id": "YLdkimr9RSrjoSa1OEzs"
    },
    {
        "position": "Recruitment Executive",
        "id": "YS9exckfWbMDzUXYiAr0"
    },
    {
        "position": "Primary School Teacher",
        "id": "YV9ZKvI4BPxZKbeITvFG"
    },
    {
        "position": "English Tutor",
        "id": "Ygs1cm3weoHONfDecj1A"
    },
    {
        "position": "Human Resources Administrator",
        "id": "YjBFuHwAHxFzFS4FIZKA"
    },
    {
        "position": "Purchasing Manager",
        "id": "Yl5Llpa9l8EUSyPqbNUE"
    },
    {
        "position": "Hotel Manager",
        "id": "YvqzRMN1mzM6lxoRYWjb"
    },
    {
        "position": "Cloud Engineer",
        "id": "YxnWr5Wy5aW1zC5iQQAN"
    },
    {
        "position": "Accounting Supervisor",
        "id": "Z0Lk7ujD9SsJFgy11TNJ"
    },
    {
        "position": "Design Assistant",
        "id": "ZBNZh4HOFm9qKk0OowGh"
    },
    {
        "position": "Procurement Officer",
        "id": "ZCyn9fjktF3h1ODp5By3"
    },
    {
        "position": "Legal Executive",
        "id": "ZJ6Dnr8ZgRan5iPYj142"
    },
    {
        "position": "Sales Administrator",
        "id": "ZNCAmxdnlTK7TWpC3XGo"
    },
    {
        "position": "Legal Counsel",
        "id": "ZPILk97qHhdRm40JadZu"
    },
    {
        "position": "Production Planner",
        "id": "ZQEGHRGEOaSauqzpFeeC"
    },
    {
        "position": "Operations Clerk ",
        "id": "ZW7kQcau2S74p7W3NwQs"
    },
    {
        "position": "Pizza Chef",
        "id": "ZZMRZ6ooSx8zC6YeQt2J"
    },
    {
        "position": "Housekeeper",
        "id": "Zacd4Mr5sDl9LHke8paD"
    },
    {
        "position": "Paramedic",
        "id": "Zt5xPxotYCLlQ2ghPIeT"
    },
    {
        "position": "Music Teacher",
        "id": "aDVMh5cLHqAeOSdXz2Gg"
    },
    {
        "position": "Computer Technician",
        "id": "aIxnPLM7INvwXH8vrSXL"
    },
    {
        "position": "Program Coordinator",
        "id": "aLtHy79HVS32mOKIDwkn"
    },
    {
        "position": "Structural Engineer",
        "id": "abgihOu6Aswhl9q6SdvO"
    },
    {
        "position": "Administration Manager",
        "id": "agGOJiNJ01NBuOcHEUbH"
    },
    {
        "position": "Treasurer",
        "id": "ajpP4vTf8XowQUnxOXnn"
    },
    {
        "position": "Therapist ",
        "id": "auh7C75HgEnqqghuo7mQ"
    },
    {
        "position": "Warehouse Manager",
        "id": "ax4E2s0dSO38it5aldRa"
    },
    {
        "position": "Assistant Branch Manager",
        "id": "ayQ3sMnkzBBjve29aRHV"
    },
    {
        "position": "Construction Supervisor ",
        "id": "b3JXP4RB87k8VwNwraE5"
    },
    {
        "position": "Maintenance Engineer",
        "id": "b6W3WoDnp07FpvCU3gqZ"
    },
    {
        "position": "Assembler",
        "id": "b7qIYwAdfb7Qin95Fv8Q"
    },
    {
        "position": "Waitperson",
        "id": "bClIQmmodKDW0tstOwI5"
    },
    {
        "position": "Cleaner",
        "id": "bFrEU4PcKUb7Lwu1Rcja"
    },
    {
        "position": "Functional Consultant",
        "id": "bGZw4RIISR5EgL2e3td9"
    },
    {
        "position": "Marketing and Communications Manager",
        "id": "bLO3LmUsLFfWAECOeDuj"
    },
    {
        "position": "Media Executive  ",
        "id": "bOXJpqZFRQoSYgfmkWu8"
    },
    {
        "position": "Science Teacher",
        "id": "bPQZGv4hohyknFFmxVzj"
    },
    {
        "position": "Plumber",
        "id": "bU2UBPRAEQ4jGpEYi06L"
    },
    {
        "position": "Pharmacy Technician",
        "id": "bXFR6VCN9QK7uYJNoR7w"
    },
    {
        "position": "Guest Services Officer",
        "id": "bcsGV9fTpCPB2LHYEquv"
    },
    {
        "position": "Kitchen Supervisor",
        "id": "biDHWSdBzwiKlOagwmwh"
    },
    {
        "position": "Designer",
        "id": "bibjy3dgl63a4qjQWdKy"
    },
    {
        "position": "Mathematics Teacher",
        "id": "brhmUgQQeO4GnlRO0q6J"
    },
    {
        "position": "Customer Service Associate ",
        "id": "burSCdzy9cm0r56GUFxg"
    },
    {
        "position": "Dept Collector",
        "id": "bwOTKzNNSJ8hknWm83ET"
    },
    {
        "position": "Room Attendant",
        "id": "bwSFB25OScJCikn13uSW"
    },
    {
        "position": "Operations Assistant ",
        "id": "bxHjq441JjiwXugtybTl"
    },
    {
        "position": "Network Administrator",
        "id": "bzRPJjCdzo8cIgLguUh5"
    },
    {
        "position": "Special Education Needs Teacher",
        "id": "c46sVoScpve5IItNI2xZ"
    },
    {
        "position": "Liaison Officer",
        "id": "c5ZOejpW9Los2lVfvHkm"
    },
    {
        "position": "Unit Manager",
        "id": "cH9kHmcLY9ZbPpT84QEy"
    },
    {
        "position": "Data Entry Clerk",
        "id": "cjPZ7aZ89JkTt3eabNG0"
    },
    {
        "position": "Financial Consultant",
        "id": "cmCykvm48bBvMZrVqP1c"
    },
    {
        "position": "Telephone Consultant",
        "id": "cxBGPC65TmieskQONr5X"
    },
    {
        "position": "Recruitment Consultant",
        "id": "cz5ASwvDgXJknWPH1rEx"
    },
    {
        "position": "Assistant",
        "id": "dGKFqHMocW0qvtBPErBG"
    },
    {
        "position": "Compliance Officer",
        "id": "dLw6bNEdTABwBGbDaNy4"
    },
    {
        "position": "Marketing Consultant",
        "id": "dMEmKSDXI8ANKZBDGT2C"
    },
    {
        "position": "Security Analyst",
        "id": "dOsMbvjN2iXRJa0QUegy"
    },
    {
        "position": "Loans Officer",
        "id": "dUrbjgiqU28AKCMoZWq6"
    },
    {
        "position": "Credit Manager",
        "id": "dXb06bYY07LNPlRiDsTq"
    },
    {
        "position": "Assistant Information Technology Manager ",
        "id": "dYC2SNdET37lhR5nz7sP"
    },
    {
        "position": "Training Manager",
        "id": "dZkitAwDB8ErTtsjX1oD"
    },
    {
        "position": "Company Secretary",
        "id": "ddtjhEzRU8ScHViR7I9P"
    },
    {
        "position": "Data Centre Operator",
        "id": "dg5kfQ2nqR4wCKctLNTG"
    },
    {
        "position": "Front Office Supervisor",
        "id": "dlaprBfwFJru4rqpcSzv"
    },
    {
        "position": "Social Media Manager",
        "id": "duksOMmkBwTL7dyHFG6q"
    },
    {
        "position": "Biomedical Engineer",
        "id": "e27XtWhXRSHBaBQSQL87"
    },
    {
        "position": "Customer Engineer",
        "id": "eBEscjibpFX8pw3IwiHQ"
    },
    {
        "position": "Contracts Manager",
        "id": "eKAwPJUQxOT2BkI5YYCj"
    },
    {
        "position": "Information Technology Engineer",
        "id": "eN9VUTasJ0Jmuy7fa59P"
    },
    {
        "position": "Administration Clerk",
        "id": "eQIDEul8CNyo8Ar76F1v"
    },
    {
        "position": "Telemarketer ",
        "id": "eWnKkkoWZjgcRlxMejoX"
    },
    {
        "position": "Digital Marketing Manager",
        "id": "eZVzmzlQOxxaiqgEDXjO"
    },
    {
        "position": "Human Resources Director",
        "id": "eb8PxwETI6NJzSpB8ccv"
    },
    {
        "position": "Food Technologist",
        "id": "ebLQ6cT4cJF2Ja8WmKLY"
    },
    {
        "position": "Regional Sales Manager",
        "id": "edWmrt49bn14bmIYyvBu"
    },
    {
        "position": "Marketing Assistant",
        "id": "eg11FCn6kOhOOHEWcefy"
    },
    {
        "position": "Mandarin Teacher",
        "id": "egjytuC7GSAMOFTqHi0Z"
    },
    {
        "position": "Architect",
        "id": "eidICXaSS9t3V9Qgo07w"
    },
    {
        "position": "Kindergarten Teacher",
        "id": "elldGxyaaW8WXgtnB8YS"
    },
    {
        "position": "Dean",
        "id": "etVhbTQzYnvfhFiMjPwH"
    },
    {
        "position": "Game Developer",
        "id": "f0Q1VGG4yRowSEs0t0kS"
    },
    {
        "position": "Lerning and Development Manager",
        "id": "f6nVB0OhqNIOdrUx9qUt"
    },
    {
        "position": "Professor",
        "id": "f920lBA9fxO0opqRe8Y1"
    },
    {
        "position": "Environmental Engineer",
        "id": "fSor8WQ59qJ6NN3nIfA1"
    },
    {
        "position": "Data Clerk",
        "id": "fV6RXA2m6uOlH5neBYjC"
    },
    {
        "position": "Research Assistant",
        "id": "fXCfnPglKimF7mcy6qJG"
    },
    {
        "position": "Mechanical Project Engineer",
        "id": "fXzzrBbyeGR0psCWxgU7"
    },
    {
        "position": "Planner  ",
        "id": "fgBhcBKoJfkJ3yQBjQ7v"
    },
    {
        "position": "Commercial Manager ",
        "id": "foNexgQpz0YeFuZYVfnn"
    },
    {
        "position": "Deckhand",
        "id": "fqZFgm7yFMB379EmV499"
    },
    {
        "position": "Decorator",
        "id": "fwCL2UK2VzbNRqQ2Wnqn"
    },
    {
        "position": "Management Information System Executive ",
        "id": "fz1gPDT1xheYK2J3hk5K"
    },
    {
        "position": "Retail Sales Associate",
        "id": "g04TyVbAArNtUhhMiVOu"
    },
    {
        "position": "Maintenance Supervisor",
        "id": "gCA5D6eTAFtrGyYk5Bzu"
    },
    {
        "position": "Police Officer",
        "id": "gLXUY7ekNPb3fdh6gSYk"
    },
    {
        "position": "User Interface Designer",
        "id": "gM2zwmi7L6eG2t9mGJ4X"
    },
    {
        "position": "Financial Officer",
        "id": "gNa6zZLyCISR1LgfDMNU"
    },
    {
        "position": "Infrastructure Manager",
        "id": "gb8kA08zoaAdd3yvbOmC"
    },
    {
        "position": "Receiving Clerk",
        "id": "geixgfvdafDhjqWA1Jew"
    },
    {
        "position": "Sales and Marketing Director",
        "id": "ghCxeehx5y1jwEnxZT5J"
    },
    {
        "position": "Executive Director ",
        "id": "gmai3Ob7Iose1YQvtGxG"
    },
    {
        "position": "Office Manager  ",
        "id": "gnQhcvd5UMoC7Y6VNcGi"
    },
    {
        "position": "Sales Adviser",
        "id": "goLIo9b6eJSpCU3CRXmQ"
    },
    {
        "position": "Service Technician",
        "id": "grAcBsvnOYEsDOQU499T"
    },
    {
        "position": "Building Manager",
        "id": "gyEXcY9hsZL3zNBYaYVf"
    },
    {
        "position": "Chef de Cuisine",
        "id": "gyW2XZLfxLqjgdSF4NqH"
    },
    {
        "position": "PHP Web Developer",
        "id": "h9ib1GmCUQoVxlTu54Ms"
    },
    {
        "position": "Welder",
        "id": "hElBBgT4xtY55XoLV4xC"
    },
    {
        "position": "Branch Officer",
        "id": "hQtJgHEr1oKjRO3Vbhxq"
    },
    {
        "position": "Boutique Manager",
        "id": "hWpCbja9FoMepJmbsyG0"
    },
    {
        "position": "Construction Project Manager ",
        "id": "hcC7cL007GDVGAT36qjo"
    },
    {
        "position": "Kitchen Assistant",
        "id": "hf6pITqHWrCJG9XwiImT"
    },
    {
        "position": "Product Executive",
        "id": "httt1IkGs3M0eCAZRYOU"
    },
    {
        "position": "Customer Service Engineer",
        "id": "hwSW6TmiaUXSQ6rouhBw"
    },
    {
        "position": "Solutions Architect",
        "id": "i31MySPK7oGtNj0Mleeo"
    },
    {
        "position": "Production Officer ",
        "id": "i8f8HPshTBGL8gl9TavK"
    },
    {
        "position": "Data Entry Operator",
        "id": "iC4H0pvwUuTFz0qdP90i"
    },
    {
        "position": "Housekeeping Supervisor",
        "id": "iEJd2C4LwFFcj43g4EjT"
    },
    {
        "position": "Incident Manager",
        "id": "iGrcAhUDYLlAQWTy7JuR"
    },
    {
        "position": "Reporter  ",
        "id": "ifggClwCYbZaWWo3u1xM"
    },
    {
        "position": "Operations Specialist",
        "id": "ijQd3EJ61zBB6CzEskl6"
    },
    {
        "position": "Analyst",
        "id": "ikqryyeuMW4wg4G5Njs2"
    },
    {
        "position": "Assistant Project Manager  ",
        "id": "iwLhwxkSPJ2Sx7eyo60j"
    },
    {
        "position": "Survey Assistant",
        "id": "ixygS7HwjAw1jGoorSf1"
    },
    {
        "position": "Sales Support Executive",
        "id": "j0C9M7PHKgxtbUYC2LYs"
    },
    {
        "position": "Customer Service Clerk",
        "id": "jEGaMufhlwy8SRMoc58J"
    },
    {
        "position": "Loan Processor",
        "id": "jX73C2xrETedLAUUrtVN"
    },
    {
        "position": "Courier",
        "id": "jeWzp5PySrUQMvO4t34u"
    },
    {
        "position": "Driver",
        "id": "jnDelbj4bBGP47D2sVKm"
    },
    {
        "position": "Dispatcher",
        "id": "joFRKLRXIkShzOwvr04k"
    },
    {
        "position": "Logistics Supervisor",
        "id": "jz5OOQfXwZeYW5CYEC1V"
    },
    {
        "position": "Educator",
        "id": "k2463MXo7nhU5WBBZxjF"
    },
    {
        "position": "Translator",
        "id": "k2pXxamjmojcPHyph3Ht"
    },
    {
        "position": "Public Relations Manager",
        "id": "k8PaMUY71w2vtTeA29II"
    },
    {
        "position": "Assistant Marketing Manager",
        "id": "kHYlCcp67KE17MUwGsBW"
    },
    {
        "position": "Aircraft Mechanic",
        "id": "kKSp2lCkNwQhZTMsz7DQ"
    },
    {
        "position": "Training Assistant",
        "id": "kPmuDOjNyFRiuD4dFFie"
    },
    {
        "position": "Barber",
        "id": "kYDAQh9Ml4dh2gnMDviA"
    },
    {
        "position": "Quality Assurance Engineer",
        "id": "kdJFh1LjosZPkgnpRKap"
    },
    {
        "position": "Purchasing Officer",
        "id": "ketyz4BszVhhglypaS4J"
    },
    {
        "position": "Process Technician",
        "id": "kjiLzpAp57skFBE8KgUv"
    },
    {
        "position": "Administration Officer",
        "id": "kmWaoPxvbFe32hxH4rsk"
    },
    {
        "position": "Systems Developer",
        "id": "ktKKyk0NligQgKtNngO4"
    },
    {
        "position": "Data Specialist",
        "id": "kzIMMTLcw5dfB5ti2Rdh"
    },
    {
        "position": "Supervisor",
        "id": "l1CZg8AxvsuLYxE1l3rb"
    },
    {
        "position": "Occupational Therapist",
        "id": "l1UckIulLUUvxP5qp6Ru"
    },
    {
        "position": "Assistant General Manager",
        "id": "l8qEeCGswurRXEpvj36V"
    },
    {
        "position": "Industrial Engineer",
        "id": "lM4YIqy794J72zP9NRjM"
    },
    {
        "position": "Solutions Consultant",
        "id": "lZs5o1U5eOAx6Fdg0Sfp"
    },
    {
        "position": "Accounting Administrative Assistant",
        "id": "ldXPDcJpKL2vcJcdfz2E"
    },
    {
        "position": "Systems Consultant ",
        "id": "lhg2XtUVqMHVEjg95FO7"
    },
    {
        "position": "Digital Marketing Executive",
        "id": "lk91sC7Ts3E5CHbi4YDB"
    },
    {
        "position": "Editor",
        "id": "lsX5Rim4hsJ3G0Jt78An"
    },
    {
        "position": "Mechanical Engineer",
        "id": "lycJ8wVkI5cQLkoS6491"
    },
    {
        "position": "Product Architect",
        "id": "m0kbmYa3IViHdShmZQSB"
    },
    {
        "position": "Inside Sales Representative",
        "id": "m3vmmUbzdgbbhXY9ydpV"
    },
    {
        "id": "m5M0nNjC8a798wxkq7xA"
    },
    {
        "position": "Site Engineer",
        "id": "m5c7hhlFNKDajWzU6gzi"
    },
    {
        "position": "Fund Accountant ",
        "id": "mD6vLi3tJ5bbsvYheZfl"
    },
    {
        "position": "Tiler",
        "id": "mHMsONujXgAradSp5jyR"
    },
    {
        "position": "Mechanical Technician",
        "id": "mlbtazp0nZTOWbHXDGgi"
    },
    {
        "position": "Insurance Broker",
        "id": "mosdJW9dBF3489eMlvqP"
    },
    {
        "position": "Payroll Administrator",
        "id": "mvU1yxYvU2cFVUjsMyjZ"
    },
    {
        "position": "Engineering Technician",
        "id": "mzx3RLNx7xn9WPcTvMXK"
    },
    {
        "position": "English Teacher",
        "id": "n00uFeYK8An7HA4WJc9V"
    },
    {
        "position": "Building Supervisor ",
        "id": "n42BwYvg3OJj70AiXQJT"
    },
    {
        "position": "Technical Associate",
        "id": "nAG7RCZoHiXPCHxttlMh"
    },
    {
        "position": "Copywriter",
        "id": "nLjpjBFcFoPFu1fLnCs6"
    },
    {
        "position": "Commis Chef",
        "id": "nO6GvFLhqhsLXtheUcF1"
    },
    {
        "position": "Shipping Officer",
        "id": "nd41plOUcNxi0wcjlAr6"
    },
    {
        "position": "Operations Coordinator ",
        "id": "nkrMEd5batJL6UtvancD"
    },
    {
        "position": "Project Executive  ",
        "id": "nmq02CXPDjiZW0bGuwck"
    },
    {
        "position": "Trainer",
        "id": "nvzHc1MeyQ2ZXwKWHbCr"
    },
    {
        "position": "Property Officer",
        "id": "nx0jENsn5OtWdQTxQgzx"
    },
    {
        "position": "Marketing and Communications Executive",
        "id": "nxSzbARrDn3SPMVQPetK"
    },
    {
        "position": "Technical Support Role",
        "id": "oBHEaDuM27gHnl6OOs82"
    },
    {
        "position": "Systems Specialist",
        "id": "oIKJOk8Cg4FXumyIALdI"
    },
    {
        "position": "Pharmacy Assistant",
        "id": "oSGU8y3m42D5r2NXYBxX"
    },
    {
        "position": "Applications Analyst",
        "id": "oX5gIxwQRwtZCAVimRCc"
    },
    {
        "position": "Mechanical Fitter",
        "id": "oaFulHjY2oE4Gy6JpRTM"
    },
    {
        "position": "District Manager",
        "id": "oaYj1onnVYZDBVJe5LCb"
    },
    {
        "position": "Counsellor",
        "id": "oeAQ7K4Elw2dl7eaR5Ah"
    },
    {
        "position": "Warehouse Clerk",
        "id": "ohVs6VoP1g0pS8zoGPhc"
    },
    {
        "position": "Project Manager ",
        "id": "oj5fq22PFlXfjrbLTPq5"
    },
    {
        "position": "Flight Attendant",
        "id": "orhUow5wcCgYVmVVWoaU"
    },
    {
        "position": "Plant Operator",
        "id": "osz7h6c3fF1UaEv3YhHA"
    },
    {
        "position": "Train Driver",
        "id": "otDUAgtgqJyuZ75Y0ls4"
    },
    {
        "position": "Social Worker",
        "id": "otNaUfGgilzUDpWoEgEU"
    },
    {
        "position": "General Manager ",
        "id": "oz35mmDfZUEO40QRRQ3h"
    },
    {
        "position": "Production Worker",
        "id": "p49YkCfqrztPXSByqFxu"
    },
    {
        "position": "Dentist",
        "id": "p80GRZNSpuyMageuknx5"
    },
    {
        "position": "Piano Teacher",
        "id": "pC9pdyPflGKzkH6gpdsD"
    },
    {
        "position": "Mechanical Design Engineer",
        "id": "pDFEOwWjEb8x5F8Rqq9Y"
    },
    {
        "position": "Credit Officer",
        "id": "pDzKDsIdbVyioxY6jh5q"
    },
    {
        "position": "Guest Relations Officer  ",
        "id": "pI1kP2Ku34hO0IwA52bz"
    },
    {
        "position": "Rigger",
        "id": "pNMqhWBIllhQqthxjHU4"
    },
    {
        "position": "Talent Acquisition Manager",
        "id": "pNgO6zb1xqeIJL9eT92A"
    },
    {
        "position": "Safety Officer ",
        "id": "pUO1shVpzwQU9UnYoVQV"
    },
    {
        "position": "Metallurgist",
        "id": "pUiOj37ClZpt6wu9D0jz"
    },
    {
        "position": "Geophysicist",
        "id": "pWYxlInwvQD3pB9ICaqb"
    },
    {
        "position": "Assistant Vice President",
        "id": "pkvdUcFHuIxft5d0mFWh"
    },
    {
        "position": "Branch Ambassador",
        "id": "pq6FGe6m5W47Bxc3IYpr"
    },
    {
        "position": "Pastry Chef",
        "id": "prI8PPbO3YcXWr5I4TLG"
    },
    {
        "position": "Marketing Director",
        "id": "pzhLQ3PaUSmjznBIPuc7"
    },
    {
        "position": "Lawyer",
        "id": "q2dM4B90krDbCS7LrKZO"
    },
    {
        "position": "Superintendent",
        "id": "q8A1dcflJxC4wsUQEpyH"
    },
    {
        "position": "Painter",
        "id": "qCTKHAyBYMNEwlAQDzsg"
    },
    {
        "position": "Client Services Officer",
        "id": "qDLhIsWVtsU84SA8Y9S6"
    },
    {
        "position": "Android Developer",
        "id": "qEAZGDNtZXVzgryjNUT8"
    },
    {
        "position": "Customer Service Manager   ",
        "id": "qLLTJWWSF16oQneDiFOc"
    },
    {
        "position": "Dealer",
        "id": "qShgQ47iYMK19AschS2D"
    },
    {
        "position": "Software Engineer",
        "id": "qWbUVsz6OnyipjYP0kiS"
    },
    {
        "position": "Laboratory Technician",
        "id": "qYdWB5vpjZzkhLQs2hBh"
    },
    {
        "position": "Technical Engineer",
        "id": "qc0dqhAWWvo0IeRVgV5c"
    },
    {
        "position": "Geotechnical Engineer",
        "id": "qh8WYYJItjkuXHnKGLCD"
    },
    {
        "position": "Draftsperson",
        "id": "qrRo1iutnFtoWHS7qGI7"
    },
    {
        "position": "Sonographer",
        "id": "qw3gSoKbN9QNzLrLSaFQ"
    },
    {
        "position": "Manufacturing Technician",
        "id": "qxPgG4EDGY9IqbN5LsKd"
    },
    {
        "position": "Logistics Officer",
        "id": "r3JqHJwyXJ2IwKHxGdUt"
    },
    {
        "position": "Optometrist",
        "id": "r4k4LGWCVkB8pTQLdFHE"
    },
    {
        "position": "Inventory Analyst",
        "id": "rEhAphjPV4oiBz6OO8Ft"
    },
    {
        "position": "Paralegal",
        "id": "rF2YJpDjui2hktp3PrIT"
    },
    {
        "position": "Business Development Director",
        "id": "rGYWzvVPMguZDe4dKNad"
    },
    {
        "position": "Human Resources Coordinator",
        "id": "rIwZoJFGhHrm52JTG2OH"
    },
    {
        "position": "Assistant Accountant",
        "id": "rKzp3ptlZtI7tkVrlC3S"
    },
    {
        "position": "IT Business Analyst",
        "id": "rS6LyUEIi5sDm6NIQeR5"
    },
    {
        "position": "Assistant Production Manager",
        "id": "rTGnkpgIjAlIMCK21xV5"
    },
    {
        "position": "Fashion Adviser",
        "id": "rUmzmqddcjgEqL2yO95j"
    },
    {
        "position": "Finance Manager",
        "id": "rmg6y2WJnOKyELgdDoTh"
    },
    {
        "position": "Testing Engineer",
        "id": "rrMc7jOC6Bolm3nUmSN7"
    },
    {
        "position": "Financial Analyst",
        "id": "rrpEMd9eNDTZoY8unVF6"
    },
    {
        "position": "Public Relations Officer",
        "id": "rtcHKXFzecN1KSgb7ZCI"
    },
    {
        "position": "Art Therapist",
        "id": "ruWIZAHDb5nJ7yUSnWq8"
    },
    {
        "position": "Piping Engineer",
        "id": "ryyMhtWb19YMQPoBhbNU"
    },
    {
        "position": "Teacher",
        "id": "s4IPZpBezFpXD90qm9TE"
    },
    {
        "position": "Process Manager",
        "id": "s8MrOysT4y8ELBgmCj1w"
    },
    {
        "position": "Applications Engineer",
        "id": "sWF3xktbgWsZ711Pczzi"
    },
    {
        "position": "Divisional Manager ",
        "id": "sZDaN6V4dZYU5DcH4Tt6"
    },
    {
        "position": "Business Development Executive",
        "id": "sa9EjNoVlzeDGO1P8Nli"
    },
    {
        "position": "Executive Chef",
        "id": "se8kDddZhe2YyKxVLJ2x"
    },
    {
        "position": "Managing Director ",
        "id": "sj6vk99i13aYPDyFBzLW"
    },
    {
        "position": "Applications Developer",
        "id": "t3pb7Z2WSYw1072V0LTZ"
    },
    {
        "position": "Software Developer",
        "id": "t4G6mI7xY7mWALrAGgsE"
    },
    {
        "position": "IT Support Engineer",
        "id": "t6GgJOJ7O5b0k0RwI3Oz"
    },
    {
        "position": "Civil Technician",
        "id": "tHEjo8h5u440DAizssKS"
    },
    {
        "position": "Team Manager",
        "id": "tIDR84LAN4k2olKwOL5f"
    },
    {
        "position": "Quality Control Inspector",
        "id": "tJk7ZcH9lwx8MlWs7TQ0"
    },
    {
        "position": "Category Manager",
        "id": "tVBTUq64lnlXhHhpZkv5"
    },
    {
        "position": "Librarian",
        "id": "tiede7YvI8wLfCOiG3Nb"
    },
    {
        "position": "Finance Associate ",
        "id": "tmzcQo31ZDw1OM04sOId"
    },
    {
        "position": "Private Tutor",
        "id": "tnzQ4EvnuVnvvwZEJz46"
    },
    {
        "position": "Information Technology Officer",
        "id": "ttd5SdJ8gd5NJr8TWaDz"
    },
    {
        "position": "Procurement Manager",
        "id": "tvSfKLqGrlr0Q1ByBv14"
    },
    {
        "position": "Customer Support Executive ",
        "id": "txQoWukb8cUFuDSFIof8"
    },
    {
        "position": "Assistant Controller",
        "id": "ty9UHNZrHVd9jJ2jTAqr"
    },
    {
        "position": "Supply Chain Assistant",
        "id": "uCCgYwmkUWrYlkiaBn07"
    },
    {
        "position": "Quality Assurance Assistant",
        "id": "uG8lSCPRznC67VywXcDu"
    },
    {
        "position": "Electrical Technician",
        "id": "ugk40WC5rmCyrcgKjZMm"
    },
    {
        "position": "Human Resources Officer",
        "id": "uwMpVQAI6kVyJbcNqtBR"
    },
    {
        "position": "Material Handler",
        "id": "v6j7yU7ZrXEdm2SsDUNt"
    },
    {
        "position": "Electronics Engineer",
        "id": "vA9wCEdqbgMZe7VJIFXQ"
    },
    {
        "position": "Purchasing Coordinator",
        "id": "vC0cDgdKvLQQkpr54055"
    },
    {
        "position": "Registered Nurse",
        "id": "vEnRE9Wr0ZtfJf4YrlKq"
    },
    {
        "position": "Assistant Accounting Manager",
        "id": "vFAJ5O3KlnIVfPdkVFeP"
    },
    {
        "position": "Photographer ",
        "id": "vIGyWjLwkt9P4uRVSqUH"
    },
    {
        "position": "Vice President",
        "id": "vKCVEadrHafhmXpMQuIv"
    },
    {
        "position": "Management Associate ",
        "id": "vMu5PCFNIyxeaIIpeh0j"
    },
    {
        "position": "Change Manager",
        "id": "vRnhI66wHHtuYl2PGTa9"
    },
    {
        "position": "Administration Assistant",
        "id": "vX3yj7xqZlKNRFyzPwKI"
    },
    {
        "position": "Operator ",
        "id": "vdaZO2MUCyc6ghDza9tA"
    },
    {
        "position": "Account Assistant",
        "id": "vk0k7vF1nHmrwpRZczbW"
    },
    {
        "position": "Costing Analyst",
        "id": "vr8EY7UX9NEdOFd7hRiS"
    },
    {
        "position": "Storekeeper",
        "id": "vxxm4dATqg0iZsYWrsrL"
    },
    {
        "position": "Pharmacist",
        "id": "vzvA11k15Je53KUb0PXB"
    },
    {
        "position": "IT Support Technician",
        "id": "w44u6ipqnjISCa3ei0gs"
    },
    {
        "position": "Management Trainee",
        "id": "w6MptcCEjOINCn1cYLyl"
    },
    {
        "position": "Facilities Manager",
        "id": "w9MNWNF6y5P4VkocA5hR"
    },
    {
        "position": "Artist ",
        "id": "wHn644P3vWml2IoFzryq"
    },
    {
        "position": "Clerk",
        "id": "wMhyyszX81a03f3S1cCH"
    },
    {
        "position": "Electrical Engineer",
        "id": "wUH55Z6VPY7jVBMfaa75"
    },
    {
        "position": "Communications Executive",
        "id": "wffo9A70TAivU5si0KIr"
    },
    {
        "position": "Audit Manager",
        "id": "wr4CayyI4YrxTPuke0Pc"
    },
    {
        "position": "Pilot",
        "id": "x0d8C3bZfbQiq9vaa4Hu"
    },
    {
        "position": "Veterinarian",
        "id": "x2jcixouMLT9nGBe76ef"
    },
    {
        "position": "Kitchenhand",
        "id": "x3ER16iFoCcun6KNcehn"
    },
    {
        "position": "Design Manager ",
        "id": "x57wxJhGdaj14Djzyg48"
    },
    {
        "position": "Shift Supervisor",
        "id": "x79G9lC4hBbP2o1PkUhY"
    },
    {
        "position": "Executive Assistant",
        "id": "xGMcDkbFY48AdBGUkwis"
    },
    {
        "position": "Property Manager",
        "id": "xL9QxfPiMkPyDKMxJIet"
    },
    {
        "position": "Account Director",
        "id": "xUFHYA0TkaLsHzPKNoFK"
    },
    {
        "position": "Assistant Store Manager",
        "id": "xWWHq9e2MmOK2ThDmxeP"
    },
    {
        "position": "Floor Manager",
        "id": "xXSdBGRCAT1eNj3B4JOi"
    },
    {
        "position": "Mechanical Supervisor",
        "id": "xf9QfwkvvG6I3Egd797M"
    },
    {
        "position": "Client Relationship Manager",
        "id": "xi0oF05xKBqmSbfdhwas"
    },
    {
        "position": "Lifeguard",
        "id": "xpFLm4TpjPGCeb6pEkmc"
    },
    {
        "position": "Maritime Engineer",
        "id": "xrCC41Bs4eC621jupSHw"
    },
    {
        "position": "Sourcing Specialist",
        "id": "xtSM2cGwZUITzrB3UxmH"
    },
    {
        "position": "Event Assistant",
        "id": "y0d7O1GmA6ahzZ4RFreJ"
    },
    {
        "position": "Marketing Officer",
        "id": "y4ZPFKCNxuDK5aVgUgNi"
    },
    {
        "position": "Dental Assistant",
        "id": "y4cZELp3Edg0KqBKTkZI"
    },
    {
        "position": "Sous Chef",
        "id": "y8p4OEFSw98BV2HnH512"
    },
    {
        "position": "Marketing Specialist",
        "id": "yFtmj2wbbC7X5WBPZCyT"
    },
    {
        "position": "Human Resources Assistant",
        "id": "yHT6HfSp0vIBxNMXctnW"
    },
    {
        "position": "IT Support Officer",
        "id": "yIO3ccTHOHT5EFJd4Dyl"
    },
    {
        "position": "Concierge",
        "id": "yJmWLYRyCQ9Xbs3gG3z3"
    },
    {
        "position": "Sales Clerk",
        "id": "yRBztlnyi4ZWTy4tfPzy"
    },
    {
        "position": "Crane Operator ",
        "id": "yYxPEHY1Dq7HMCBUUeA9"
    },
    {
        "position": "Construction Manager ",
        "id": "yj7f66EjXMyEucQpDnGr"
    },
    {
        "position": "Merchandiser",
        "id": "ysRVEN9IsHUMHkkc9Xai"
    },
    {
        "position": "Taxi Driver",
        "id": "yuJhHttJxcysW1c8KXfc"
    },
    {
        "position": "Director",
        "id": "yvshcY5zsGWkZdzQbNmO"
    },
    {
        "position": "Delivery Driver",
        "id": "yzW70tmbMBQzmqmi9q4z"
    },
    {
        "position": "Procurement Assistant",
        "id": "z0TIERT9JjbELvnqIYtS"
    },
    {
        "position": "Factory Manager",
        "id": "z0bkyZ6ktJDnIkEuLrrG"
    },
    {
        "position": "Front End Developer",
        "id": "z1OVCFtPMrZTsJag5UsE"
    },
    {
        "position": "Front Office Executive",
        "id": "zHRTxX0HHCQQ4yW6o4Ou"
    },
    {
        "position": "Product Consultant",
        "id": "zHmkC0B9O4cIgzSvnD3p"
    },
    {
        "position": "Business Analyst",
        "id": "zaPDTSwRZuVcGA0Qui1t"
    },
    {
        "position": "Information Systems Manager",
        "id": "zczGnIC10uZ8pJZP6lO8"
    },
    {
        "position": "Tutor",
        "id": "zfrr0idNr0lK62q8KJee"
    },
    {
        "position": "Technical Manager",
        "id": "zhaFbIL6paKslMIwOjdS"
    },
    {
        "position": "Property Consultant",
        "id": "zkpt1jnK9elvN6KJmTRl"
    },
    {
        "position": "Branch Operations Manager",
        "id": "zsmONt1RllSVt5F7Lqab"
    },
    {
        "position": "Automotive Mechanic",
        "id": "zwqIVkU4CGILff0XVILT"
    },
    {
        "position": "Assistant Operations Manager",
        "id": "zxqDQB0bZODvKCzz4yme"
    }
];
  term: any = "";

  get jtitle() {
    return this.credentials.get('jtitle');
  }

  get jsalary() {
    return this.credentials.get('jsalary');
  }

  get jspecialization() {
    return this.credentials.get('jspecialization');
  }

  get jtype() {
    return this.credentials.get('jtype');
  }

  get cname() {
    return this.credentials.get('cname');
  }

  get caddress() {
    return this.credentials.get('caddress');
  }

  get ccontact() {
    return this.credentials.get('ccontact');
  }

  get cemail() {
    return this.credentials.get('cemail');
  }

  get cdetails() {
    return this.credentials.get('cdetails');
  }

  get csize() {
    return this.credentials.get('csize');
  }

  get cprocessingtime() {
    return this.credentials.get('cprocessingtime');
  }

  get cbenefits() {
    return this.credentials.get('cbenefits');
  }

  constructor(
    private firestore: CompanyService,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auth: AuthService,
    private router: Router,
    private storage: Storage,
    private authd: Auth,
    private toastController: ToastController
  ) {
    this.firestore.getcompany().subscribe(res=>{
      this.job = res;
    })
   }

  ngOnInit() {
    this.credentials = this.fb.group({
      jtitle: ['', [Validators.required]],
      jsalary: ['', []],
      jposition: ['', [Validators.required]],
      jtype: ['', [Validators.required]],
      jdescription: ['', [Validators.required]],
      jexperience: ['', []],
      attainment: ['', []],

    });
    
  }

  async addjoblisting() {

    const loading = await this.loadingController.create({
      spinner: "dots",
      message: "Adding up!"
    });    await loading.present();

    const user = await this.firestore.addjoblisting(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/dashboardcompany', { replaceUrl: true });
      this.showAlert('Add success', '');


        } else {
      this.showAlert('Add failed', 'Please try again!');
    }
  }

  async search(event: any){
    const searchTerm = event.target.value;


    if (searchTerm == ""){
      this.queryinit = [];
    }else{
        this.queryinit = this.filteredquery;
    }
    
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();

  }




  async showAlert(header: any, message: any) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async check(event: any, filter: any){
    this.credentials.value.jposition = filter.position;
    this.queryinit = [];
    this.term = "";
    this.determine = false;
  }
  
  reset(){

    this.determine = true;

    
  }


}
