<?php

namespace app\Helpers;

use Carbon\Carbon;

class DateHelpers
{
    public static function hello()
    {
        return "Hello, World!";
    }

    public static function convertToLaravelDateFormat($date)
    {
        return Carbon::parse($date)->format('Y-m-d');
    }
}