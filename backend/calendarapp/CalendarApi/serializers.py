from rest_framework import serializers


class MonthTaskBoundaryElementSerializer(serializers.Serializer):
    taskId = serializers.IntegerField()
    displayOrder = serializers.IntegerField()
    priority = serializers.CharField(max_length=3)


class DayBoundaryElementSerializer(serializers.Serializer):
    dayOrder = serializers.IntegerField()
    dayNumber = serializers.IntegerField()
    isActive = serializers.BooleanField()
    isCurrentDay = serializers.BooleanField()
    containsMoreThan2Events = serializers.BooleanField()
    visibleTasks = MonthTaskBoundaryElementSerializer(many=True)


class MonthCalendarStateSerializer(serializers.Serializer):
    dayBoundaryElements = DayBoundaryElementSerializer(many=True)


class CalendarSerializer(serializers.Serializer):
    monthCalendarState = MonthCalendarStateSerializer()