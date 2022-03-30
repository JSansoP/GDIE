import math


#el fichero de input tiene que ser sacado de el apartado "Mostrar transcripcion" (copiar y pegar todo en un .txt)
#falta mirar que pasa cuando el tiempo supera los 60 minutos


def main():
    delayEndStart = 2
    # Get the input file
    inputFile = input("Enter the name of the input file: ")
    # Open the input file
    with open(inputFile, 'r') as f:
        # Read the input file
        lines = f.readlines()
        # Create a new file
        outputFile = input("Enter the name of the output file: ")
        with open(outputFile, 'w') as f2:
            f2.write("WEBVTT\n\n\n")
            # Loop through the lines
            # Write the new file
            count = 0
            for line in lines:
                if count%2 == 0:
                    outputline = secondsToString(parseTime(line)) + " --> "+secondsToString(parseTime(line)+delayEndStart)+"\n"
                else:
                    outputline = line
                count = count + 1
                f2.write(outputline)

#parse mm:ss to seconds
def parseTime(time):
    time = time.split(':')
    time = int(time[0])*60 + int(time[1])
    return time

def secondsToString(seconds):
    hours = math.floor(seconds/3600)
    minutes = math.floor((seconds%3600)/60)
    seconds = seconds%60
    miliseconds = math.floor((seconds - math.floor(seconds))*1000)

    if hours < 10:
        hours = "0" + str(hours)
    if minutes < 10:
        minutes = "0" + str(minutes)
    if seconds < 10:
        seconds = "0" + str(seconds)
    if miliseconds < 10:
        miliseconds = "00" + str(miliseconds)
    elif miliseconds < 100:
        miliseconds = "0" + str(miliseconds)
    return str(hours)+":"+str(minutes)+":"+str(seconds)+"."+str(miliseconds)

if __name__ == "__main__":
    main()