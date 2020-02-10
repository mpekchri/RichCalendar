from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework.authtoken.models import Token
from datetime import datetime
import calendar


# Custom User model
class CustomUserManager(BaseUserManager):

    def create_user(self, name, password):
        if not name:
            raise ValueError("Users must have a name")

        if not password:
            raise ValueError("Users must have a password")

        user = self.model(name=name)
        user.set_password(password)
        user.save(using=self.db)
        Token.objects.create(user=user)
        return user


    def create_superuser(self, name, password):
        user = self.create_user(name,password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self.db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = []

    # extra attributes
    foremen = models.ManyToManyField('self', related_name='subsistents')
    assignedTasks = models.ManyToManyField('Task', related_name='userAssignment')
    group = models.ForeignKey('Group', related_name='users', on_delete=models.CASCADE, null=True)

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name


# Enum definitions
class CustomEnums(models.Model):
    # visibility enum :
    OWN_TASKS = 'OT'
    TASKS_THAT_CONCERN_MYSELF = 'TTCM'
    GROUP_TASKS = 'GT'
    SUBSISTENTS_TASKS = 'ST'
    FOREMEN_TASKS = 'FT'
    ALL_TASKS = 'ALLT'
    TASK_VISIBILITY = [
        (OWN_TASKS, 'own tasks'),
        (TASKS_THAT_CONCERN_MYSELF, 'tasks that concern me'),
        (GROUP_TASKS, 'group tasks'),
        (SUBSISTENTS_TASKS, "my subsistent tasks"),
        (FOREMEN_TASKS, "my foremen tasks"),
        (ALL_TASKS, 'all tasks'),        
    ]

    # status enum :
    COMPLETED = 'CMPL'
    PENDING = 'P'
    NOT_STARTED = 'NS'
    CANCELLED = 'CNCL'
    TASK_STATUS = [
        (COMPLETED, 'completed'),
        (PENDING, 'pending'),
        (NOT_STARTED, 'not started'),
        (CANCELLED, "cancelled"),
    ]

    # priority enum :
    HIGHEST = 'HST'
    HIGH = 'H'
    MEDIUM = 'M'
    LOW = 'L'
    REMINDER = 'R'
    TASK_PRIORITY = [
        (HIGHEST, 'highest'),
        (HIGH, 'high'),
        (MEDIUM, 'medium'),
        (LOW, "low"),
        (REMINDER, "reminder"),
    ]


# Create your models here.
class DomainModel(models.Model):
    actions = models.ForeignKey('Action', on_delete=models.CASCADE, null=True)
    currentState = models.OneToOneField('State', on_delete=models.CASCADE)
    prevStates = models.ForeignKey('State', on_delete=models.CASCADE, related_name='+', null=True)


class Action(models.Model):
    prevState = models.OneToOneField('State', on_delete=models.CASCADE, related_name="+")
    nextState = models.OneToOneField('State', on_delete=models.CASCADE, related_name="+")
    madeBy = models.OneToOneField('User', on_delete=models.CASCADE)
    date = models.DateField()
    actionType = models.CharField(max_length=130)


class State(models.Model):
    tasks = models.ManyToManyField('Task', related_name='state')
    groups = models.ManyToManyField('Group', related_name='state')
    users = models.ManyToManyField('User', related_name='state')

    def applyFilters_getMonth(self, filters, searchText, selectedDate, user):
        if filters is None:
            if searchText is None:
                if selectedDate is None:
                    date = datetime.now().date()
                else:
                    date = selectedDate
                monthDayRange = calendar.monthrange(date.year, date.month)
                tasks = self.getTasksInRange(startDate=date.replace(day=monthDayRange[0]),endDate=date.replace(day=monthDayRange[1]))
                return tasks
            else:
                pass
        else:
            pass


    def getTasksInRange(self, startDate,endDate):
        # tasks = self.tasks.filter(fromDate >= startDate, toDate <= endDate)
        tasks = list(filter( lambda t: t.fromDate >= startDate and t.toDate <= endDate , self.tasks.all()))
        return tasks


class Task(models.Model):
    createdAt = models.DateField(auto_now_add=True)
    fromDate = models.DateField()
    toDate = models.DateField()
    visibility = models.CharField(choices=CustomEnums.TASK_VISIBILITY,max_length=130)
    status = models.CharField(choices=CustomEnums.TASK_STATUS,max_length=130)
    priority = models.CharField(choices=CustomEnums.TASK_PRIORITY,max_length=130)
    createdBy = models.ForeignKey('User', related_name='tasks', on_delete=models.CASCADE, null=True)
    name = models.CharField(unique=True,max_length=130, default="taskname")


class Group(models.Model):
    name = models.CharField(unique=True,max_length=130)
    assignedTasks = models.ManyToManyField(Task, related_name='groupAssignment')