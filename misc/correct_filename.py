#!/usr/bin/env python3

import sys

def strip_parens_hyphens(inStr):
    outStr = ""
    for c in inStr:
        if c != "(" and c != ")" and c != "-":
            outStr += c
    return outStr

def correct_text(inStr):
    return inStr.replace("adapted from", "leadsheet based on")

def collapse_consecutive_whitespace(inStr):
    return " ".join(inStr.split())

def add_hyphen(inStr):
    return inStr.replace("leadsheet based", "- leadsheet based")

myStr = sys.argv[1]
myStr = myStr.replace("piano - vocal", "piano vocal")
myStr = myStr.replace("(leadsheet", "- leadsheet")
myStr = myStr.replace(" - C Insts", "")
myStr = myStr.replace(" C Insts", "")
if "from" not in myStr:
    myStr = myStr.replace("(19", "- 19")
    myStr = myStr.replace(").", ".")
    print(myStr)
    sys.exit()
myStr = strip_parens_hyphens(myStr)
myStr = myStr.replace("pianovocal", "piano vocal")
myStr = correct_text(myStr)
myStr = collapse_consecutive_whitespace(myStr)
myStr = add_hyphen(myStr)
print(myStr)

