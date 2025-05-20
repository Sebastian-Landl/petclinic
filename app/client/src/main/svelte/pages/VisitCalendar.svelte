<script>
  import { onMount } from "svelte";
  import { toast } from "../components/Toast";
  import { loadAllValue } from "../utils/rest.js";
  import { formatDate, formatWeekday, formatTimeString, calculateDuration } from "../utils/date.js";
  import Icon from "../components/Icon";
  import VisitDiagnose from "./VisitDiagnose.svelte";

  // Calendar state
  let currentWeekStart = new Date();
  currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Set to Sunday
  let allVisit = [];
  let visitId = undefined;
  let visitEditorUpdate = false;
  let selectedVisit = null;
  let selectedDate = null;
  let allVetItem = [];

  // Time grid configuration
  const dayStartHour = 8; // 8 AM
  const dayEndHour = 18; // 6 PM
  const hourHeight = 60; // pixels per hour

  // Generate days of the week
  $: weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentWeekStart);
    day.setDate(day.getDate() + i);
    return day;
  });

  // Format date for display
  function formatDateHeader(date) {
    return `${formatWeekday(date)} ${date.getDate()}.${date.getMonth() + 1}.`;
  }

  // Navigate to previous week
  function previousWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    currentWeekStart = newDate;
    loadVisitsForCurrentWeek();
  }

  // Navigate to next week
  function nextWeek() {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    currentWeekStart = newDate;
    loadVisitsForCurrentWeek();
  }

  // Navigate to current week
  function goToCurrentWeek() {
    const today = new Date();
    today.setDate(today.getDate() - today.getDay()); // Set to Sunday
    currentWeekStart = today;
    loadVisitsForCurrentWeek();
  }

  // Load visits for the current week
  function loadVisitsForCurrentWeek() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const startDateStr = formatDate(currentWeekStart);
    const endDateStr = formatDate(weekEnd);

    loadAllValue(`/api/visit?date=${startDateStr}&date=${endDateStr}&sort=date,asc`)
      .then((json) => {
        console.log(["loadVisitsForCurrentWeek", json]);
        allVisit = json;
      })
      .catch((err) => {
        console.log(["loadVisitsForCurrentWeek", err]);
        toast.push(err.toString());
      });
  }

  // Group visits by date
  $: visitsByDate = allVisit.reduce((acc, visit) => {
    if (!acc[visit.date]) {
      acc[visit.date] = [];
    }
    acc[visit.date].push(visit);
    return acc;
  }, {});

  // Get visits for a specific day
  function getVisitsForDay(dateStr) {
    return visitsByDate[dateStr] || [];
  }

  // Calculate position and height for a visit with time
  function getVisitStyle(visit) {
    if (!visit.startTime) return "";

    const [startHour, startMinute] = visit.startTime.split(":").map(Number);
    let height = hourHeight;
    let top = (startHour - dayStartHour) * hourHeight + (startMinute / 60) * hourHeight;

    if (visit.endTime) {
      const [endHour, endMinute] = visit.endTime.split(":").map(Number);
      const durationHours = endHour - startHour + (endMinute - startMinute) / 60;
      height = durationHours * hourHeight;
    }

    return `top: ${top}px; height: ${height}px;`;
  }

  // Handle visit click
  function onVisitClicked(visit, date) {
    visitId = visit.id;
    selectedVisit = visit;
    selectedDate = date;
  }

  // Open visit editor
  function visitEditorUpdateClicked(visit, date) {
    visitId = visit.id;
    selectedVisit = visit;
    selectedDate = date;
    visitEditorUpdate = true;
  }

  // Initialize component
  onMount(() => {
    // Load vet items for the visit editor
    loadAllValue("/api/vet?sort=name,asc")
      .then((json) => {
        allVetItem = json.map(vet => ({
          value: vet.id,
          text: vet.name,
        }));
        console.log(["onMount", allVetItem]);
      })
      .catch((err) => {
        console.log(["onMount", err]);
        toast.push(err.toString());
      });

    loadVisitsForCurrentWeek();
  });
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-2xl font-bold">Visit Calendar</h1>

  <!-- Calendar navigation -->
  <div class="flex justify-between items-center mb-4">
    <div class="flex gap-2">
      <button
        class="px-3 py-1 bg-github-header dark:bg-github-darkHeader text-white rounded hover:bg-opacity-90"
        on:click={previousWeek}
      >
        <Icon name="chevron_left" />
      </button>
      <button
        class="px-3 py-1 bg-github-header dark:bg-github-darkHeader text-white rounded hover:bg-opacity-90"
        on:click={goToCurrentWeek}
      >
        Today
      </button>
      <button
        class="px-3 py-1 bg-github-header dark:bg-github-darkHeader text-white rounded hover:bg-opacity-90"
        on:click={nextWeek}
      >
        <Icon name="chevron_right" />
      </button>
      <a
        href="/visit"
        class="flex items-center px-3 py-1 bg-github-header dark:bg-github-darkHeader text-white rounded hover:bg-opacity-90 ml-2"
      >
        <i class="material-icons text-sm mr-1">list</i>
        List View
      </a>
    </div>
    <div class="text-lg font-semibold">
      {formatDate(currentWeekStart)} - {formatDate(weekDays[6])}
    </div>
  </div>

  <!-- Calendar grid -->
  <div class="calendar-container border border-github-border dark:border-github-darkBorder rounded-md overflow-hidden">
    <!-- Day headers -->
    <div class="grid grid-cols-7 bg-github-header dark:bg-github-darkHeader text-white">
      {#each weekDays as day}
        <div class="p-2 text-center border-r border-github-border dark:border-github-darkBorder last:border-r-0">
          {formatDateHeader(day)}
        </div>
      {/each}
    </div>

    <!-- All-day events -->
    <div class="grid grid-cols-7 bg-gray-100 dark:bg-gray-800 border-b border-github-border dark:border-github-darkBorder">
      {#each weekDays as day}
        <div class="min-h-[60px] p-2 border-r border-github-border dark:border-github-darkBorder last:border-r-0">
          {#each getVisitsForDay(formatDate(day)).filter(visit => !visit.startTime) as visit}
            <div
              class="flex flex-col mb-1 p-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
              role="group"
              aria-label="Visit details"
            >
              <div class="flex justify-between">
                <button
                  class="flex-grow text-left font-semibold truncate"
                  on:click={() => onVisitClicked(visit, formatDate(day))}
                  class:ring={visitId === visit.id}
                  tabindex="0"
                  on:keydown={(e) => e.key === 'Enter' && onVisitClicked(visit, formatDate(day))}
                >
                  {visit.petItem.text}
                </button>
                <button
                  class="text-blue-800 dark:text-blue-100 ml-2"
                  on:click={() => visitEditorUpdateClicked(visit, formatDate(day))}
                  title="Edit visit"
                >
                  <i class="material-icons text-sm">edit</i>
                </button>
              </div>
              <div class="text-xs truncate">{visit.ownerItem.text}</div>
            </div>
          {/each}
        </div>
      {/each}
    </div>

    <!-- Time grid -->
    <div class="relative grid grid-cols-7 calendar-time-grid">
      <!-- Time labels (left side) -->
      <div class="absolute -left-12 top-0 h-full flex flex-col">
        {#each Array.from({ length: dayEndHour - dayStartHour }, (_, i) => dayStartHour + i) as hour}
          <div class="h-[60px] flex items-start justify-end pr-2 text-xs text-gray-500">
            {hour}:00
          </div>
        {/each}
      </div>

      <!-- Hour grid lines -->
      {#each Array.from({ length: dayEndHour - dayStartHour }, (_, i) => i) as hour}
        <div class="absolute w-full h-px bg-gray-200 dark:bg-gray-700" style="top: {hour * hourHeight}px"></div>
      {/each}

      <!-- Day columns with timed events -->
      {#each weekDays as day}
        <div
          class="relative h-full border-r border-github-border dark:border-github-darkBorder last:border-r-0"
          style="min-height: {(dayEndHour - dayStartHour) * hourHeight}px;"
        >
          {#each getVisitsForDay(formatDate(day)).filter(visit => visit.startTime) as visit}
            <div
              class="absolute w-[95%] p-2 bg-blue-500 dark:bg-blue-700 text-white rounded text-sm cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-600 overflow-hidden"
              style={getVisitStyle(visit)}
              role="group"
              aria-label="Visit details"
            >
              <div class="flex justify-between">
                <button
                  class="flex-grow text-left font-semibold truncate text-white"
                  on:click={() => onVisitClicked(visit, formatDate(day))}
                  class:ring={visitId === visit.id}
                  tabindex="0"
                  on:keydown={(e) => e.key === 'Enter' && onVisitClicked(visit, formatDate(day))}
                >
                  {visit.petItem.text}
                </button>
                <button
                  class="text-white ml-2"
                  on:click={() => visitEditorUpdateClicked(visit, formatDate(day))}
                  title="Edit visit"
                >
                  <i class="material-icons text-sm">edit</i>
                </button>
              </div>
              <div class="text-xs">{formatTimeString(visit.startTime)} {visit.endTime ? `- ${formatTimeString(visit.endTime)}` : ''}</div>
              <div class="text-xs truncate">{visit.ownerItem.text}</div>
              {#if visit.vetItem?.text}
                <div class="text-xs truncate">{visit.vetItem.text}</div>
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Visit editor dialog -->
  {#if visitEditorUpdate && selectedVisit}
    <div class="mt-4 p-4 border border-github-border dark:border-github-darkBorder rounded-md bg-white dark:bg-github-darkHeader">
      <VisitDiagnose
        bind:visible={visitEditorUpdate}
        on:update={() => loadVisitsForCurrentWeek()}
        on:remove={() => loadVisitsForCurrentWeek()}
        date={selectedDate}
        visit={selectedVisit}
        {allVetItem}
      />
    </div>
  {/if}
</div>

<style>
  .calendar-container {
    width: 100%;
    overflow-x: auto;
  }

  .calendar-time-grid {
    position: relative;
    min-height: 600px;
  }
</style>
