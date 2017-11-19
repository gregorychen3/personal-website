import java.util.Random;

/*
 * Simple program to generate random 0s and 1s,
 * with a space between each consecutive character
 * Terminate with a signal.
 */
public class GenerateBinaryDigits {
    public static void main(String[] args) {
        Random random = new Random();
        while (true) {
            System.out.print(random.nextInt(2) + " ");
        }
    }
}

