<?php

namespace App\Http\Controllers;

use app\Helpers\DateHelpers;
use App\Http\Requests\StoreBdlDetailRequest;
use App\Http\Requests\StorePersonalDetailRequest;
use App\Http\Requests\StoreRpoMeaDetailRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // $query = Project::query();

        // $sortField = request("sort_field", 'created_at');
        // $sortDirection = request("sort_direction", "desc");

        // if (request("name")) {
        //     $query->where("name", "like", "%" . request("name") . "%");
        // }
        // if (request("status")) {
        //     $query->where("status", request("status"));
        // }

        // $projects = $query->orderBy($sortField, $sortDirection)
        //     ->paginate(10)
        //     ->onEachSide(1);

        // return inertia("Project/Index", [
        //     "projects" => ProjectResource::collection($projects),
        //     'queryParams' => request()->query() ?: null,
        //     'success' => session('success'),
        // ]);
        $people = Person::paginate(10);

        return Inertia::render('Person/Index', [
            'people' => PersonResource::collection($people),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Person $person = null)
    {
        return inertia("Person/Create", [
            'person' => $person
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storePersonalDetails(StorePersonalDetailRequest $request)
    {
        $data = $request->validated();

        if ($data['dob']) {
            $data['dob'] = DateHelpers::convertToLaravelDateFormat($data['dob']);
        }
        $data['created_by'] = Auth::id();
        $person = Person::create($data);

        return to_route('person.create', [
            'person' => $person
        ])
            ->with('success', 'Person was created');
    }

    public function updatePersonalDetails(StorePersonalDetailRequest $request, Person $person)
    {
        $data = $request->validated();

        if ($data['dob']) {
            $data['dob'] = DateHelpers::convertToLaravelDateFormat($data['dob']);
        }

        $person->fill($data);

        if ($person->isDirty()) {
            $person->save();
        }

        return to_route('person.create')
            ->with('success', 'Person was created');
    }

    public function updateBdlDetails(StoreBdlDetailRequest $request, Person $person)
    {
        $data = $request->validated();

        $person->fill($data);

        if ($person->isDirty()) {
            $person->save();
        }

        return to_route('person.create', [
            'person' => $person
        ])
            ->with('success', 'Person was created');
    }

    public function updateRpoMeaDetails(StoreRpoMeaDetailRequest $request, Person $person)
    {
        $data = $request->validated();

        // dd($data);
        // $data['submission_date'] = DateHelpers::convertToLaravelDateFormat(($data['submission_date']));

        // $person->fill($data);

        // dd($person);

        // if ($person->isDirty()) {
        //     $person->save();
        // }


        $person->update([
            'submission_date' => DateHelpers::convertToLaravelDateFormat($data['submission_date']),
            'MEA_number' => $data['MEA_number']
        ]);

        return to_route('person.create', [
            'person' => $person
        ])
            ->with('success', 'Person was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Person $person)
    {
        // $query = $project->tasks();

        // $sortField = request("sort_field", 'created_at');
        // $sortDirection = request("sort_direction", "desc");

        // if (request("name")) {
        //     $query->where("name", "like", "%" . request("name") . "%");
        // }
        // if (request("status")) {
        //     $query->where("status", request("status"));
        // }

        // $tasks = $query->orderBy($sortField, $sortDirection)
        //     ->paginate(10)
        //     ->onEachSide(1);
        // return inertia('Project/Show', [
        //     'project' => new ProjectResource($project),
        //     "tasks" => TaskResource::collection($tasks),
        //     'queryParams' => request()->query() ?: null,
        //     'success' => session('success'),
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person)
    {
        // return inertia('Project/Edit', [
        //     'project' => new ProjectResource($project),
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, Person $person)
    {
        // $data = $request->validated();
        // $image = $data['image'] ?? null;
        // $data['updated_by'] = Auth::id();
        // if ($image) {
        //     if ($project->image_path) {
        //         Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        //     }
        //     $data['image_path'] = $image->store('project/' . Str::random(), 'public');
        // }
        // $project->update($data);

        // return to_route('project.index')
        //     ->with('success', "Project \"$project->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person)
    {
        // $name = $project->name;
        // $project->delete();
        // if ($project->image_path) {
        //     Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        // }
        // return to_route('project.index')
        //     ->with('success', "Project \"$name\" was deleted");
    }
}