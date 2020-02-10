from django.db import models
from datetime import datetime
import calendar
import copy


# Create your models here.
class CalendarStore:
    def __init__(self, yearCalendarState=None, monthCalendarState=None, dayCalendarState=None):
        self.yearCalendarState = yearCalendarState
        self.monthCalendarState = monthCalendarState
        self.dayCalendarState = dayCalendarState


class MonthCalendarState:
    def __init__(self, tasks, selectedDate):
        self.dayBoundaryElements = []
        c = calendar.Calendar(calendar.MONDAY)
        days = self.getDayDatesOfMonth(selectedDate=selectedDate)
        if len(days) != 42:
            if selectedDate.month == 12:
                nextMonth = 1
            else:
                nextMonth = selectedDate.month+1
            nextMonthsDays = self.getDayDatesOfMonth(selectedDate.replace(month=nextMonth), onlySpecifiedMonth=True)
            days.extend(nextMonthsDays)
        
        # Create proper task-in-days array, using addTasksIntoDays :
        dayDatesWithTasks = self.addTasksIntoDays(tasks, days)
        
        for index, d in enumerate(dayDatesWithTasks):
            newEl = DayBoundaryElement(
                dayOrder=index+1,
                dayNumber=d['date'].day,
                isActive=(d['date'].month == datetime.now().month),
                isCurrentDay=(d['date'].day == datetime.now().day),
                visibleTasks=d['tasks'],
                containsMoreThan2Events=d['hasMoreThan2Tasks']

            )
            self.dayBoundaryElements.append(newEl)


    def getDayDatesOfMonth(self, selectedDate,onlySpecifiedMonth=False):
        c = calendar.Calendar(calendar.MONDAY)
        dates = []
        for dayDate in c.itermonthdates(selectedDate.year, selectedDate.month):
            dates.append(dayDate)
        if onlySpecifiedMonth:
            dates = list(filter(lambda x: x.month == selectedDate.month ,dates))
        return dates


    def addTasksIntoDays(self, tasks, dayDates):
        # first sort tasks based on their time range (desc)
        sortedTasks = copy.deepcopy(tasks)
        for t in sortedTasks:
            if t.fromDate < dayDates[0]:
                t.fromDate = dayDates[0]
            if t.toDate > dayDates[len(dayDates)-1]:
                t.toDate = dayDates[len(dayDates)-1]
            setattr(t, 'timeRange', (t.toDate - t.fromDate).seconds)
        sortedTasks = sorted(sortedTasks, key=lambda t: t.timeRange, reverse=True)
        # then add tasks to dates, beggining from the tasks with the biggest duration
        daysWithTasks = []
        for index,d in enumerate(dayDates):
            daysWithTasks.append({
                "date":d, # datetime.Date object
                # "dayOrder":index+1, # index
                "tasks":[],
                "hasMoreThan2Tasks":False
            })
        for t in sortedTasks:
            for d in daysWithTasks:
                if d['date'] >= t.fromDate and d['date'] <= t.toDate:
                    if len(d['tasks']) == 2 :
                        d['hasMoreThan2Tasks'] = True
                    elif len(d['tasks']) == 1:
                        d['tasks'].append(MonthTaskBoundaryElement(
                            taskId=t.id,
                            priority=t.priority,
                            displayOrder=2
                        ))
                    else:
                        d['tasks'].append(MonthTaskBoundaryElement(
                            taskId=t.id,
                            priority=t.priority,
                            displayOrder=1
                        ))
        return daysWithTasks


class DayBoundaryElement:
    def __init__(self, dayOrder, dayNumber, isActive=False,
        isCurrentDay=False, containsMoreThan2Events=False, 
        visibleTasks=None):
        self.dayOrder = dayOrder
        self.dayNumber = dayNumber
        self.isActive = isActive
        self.isCurrentDay = isCurrentDay
        self.containsMoreThan2Events = containsMoreThan2Events
        self.visibleTasks = visibleTasks


class MonthTaskBoundaryElement:
    def __init__(self, taskId, priority, displayOrder):
        self.taskId = taskId
        self.priority = priority
        self.displayOrder = displayOrder