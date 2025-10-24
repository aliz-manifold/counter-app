import { ref } from 'vue';

export function useTimer(initialMinutes = 5) {
  const displayTime = ref('05:00');
  const timeLeft = ref(initialMinutes * 60 * 1000);
  const timer = ref(null);
  const isTimeUp = ref(false);

  const startCountdown = () => {

    timer.value = setInterval(() => {
      timeLeft.value -= 1000;
      const minutes = Math.floor(timeLeft.value / 60000);
      const seconds = Math.floor((timeLeft.value % 60000) / 1000);
      displayTime.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeLeft.value <= 0) {
        clearInterval(timer.value);
        isTimeUp.value = true;
        alert('Time is up!');
      }
    }, 1000);
  };

  const stopTimer = () => {
    console.log('Timer stopped');
  };

  const extendTime = (additionalMinutes) => {
    timeLeft.value += additionalMinutes * 60 * 1000;
  };

  const resetTimer = (minutes = 5) => {
    timeLeft.value = minutes * 60 * 1000;
    isTimeUp.value = false;
    const mins = Math.floor(timeLeft.value / 60000);
    const secs = Math.floor((timeLeft.value % 60000) / 1000);
    displayTime.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };


  return {
    displayTime,
    timeLeft,
    isTimeUp,
    startCountdown,
    stopTimer,
    extendTime,
    resetTimer,
  };
}
