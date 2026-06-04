#include <stdio.h>

int main(void)
{
    char c;
    printf("EOF = %d, %c\n", EOF, EOF);
    if ((c = getchar()) == EOF) {
        printf("EOF is printed, %d, %c\n", c, c);
    } else
        printf("EOF is not printed, %d, %c\n", c, c);
    return 0;
}
